// main.js

// Set up the SVG canvas dimensions
const width = 1000;
const height = 800;

// Create an SVG element and append it to the div with id "graph"
const svg = d3.select("#graph")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .style("border", "1px solid black")
              .style("display", "block")
              .style("margin", "auto")
              .call(d3.zoom().on("zoom", (event) => {
                  svg.attr("transform", event.transform);
              }))
              .append("g");

// Setup SVG groups for layering
const linkGroup = svg.append("g").attr("class", "links");
const labelGroup = svg.append("g").attr("class", "labels");
const nodeGroup = svg.append("g").attr("class", "nodes");

// Create a force simulation using the dynamically generated nodes and links from data.js
const simulation = d3.forceSimulation(nodes) // nodes array is from data.js
                     .force("link", d3.forceLink(links).id(d => d.id).distance(75)) // links array is from data.js
                     .force("charge", d3.forceManyBody().strength(-500))
                     .force("center", d3.forceCenter(width / 2, height / 2));

// Add links (lines) to the SVG
// const link = svg.append("g")
//                 .attr("stroke", "#999")
//                 .attr("stroke-opacity", 0.6)
//                 .selectAll("line")
//                 .data(links)
//                 .enter().append("line")
//                 .attr("stroke-width", 2);

const link = linkGroup.selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 2);

// Add labels to the nodes and render LaTeX
const nodeLabels = labelGroup.selectAll("foreignObject")
    .data(nodes)
    .enter().append("foreignObject")
    .attr("width", 100)
    .attr("height", 50)
    .html(d => `<div class="latex">${d.latex}</div>`);

// Add nodes (circles) to the SVG above the labels
const node = nodeGroup.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", 10)
    .attr("fill", d => {
        if (d.type === "equation") return "red";
        if (d.type === "derivation") return "yellow";
        if (d.type === "variable") return "blue";
        if (d.type === "constant") return "green";
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleClick)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

const selectionDisplay = d3.select("#graph")
    .append("div")
    .attr("id", "selectionDisplay")
    .style("text-align", "center")
    .style("margin-top", "10px")
    .style("font-size", "18px")
    .text("No node selected");

// Debounce function to limit how often a function is called
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Debounced MathJax typeset function
const debouncedTypeset = debounce(() => MathJax.typesetPromise(), 1000);

// Update positions on each tick
simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);

    nodeLabels.attr("x", d => d.x + 10)
              .attr("y", d => d.y - 5);

    // Call debounced typeset
    debouncedTypeset();
});

function updateCounts() {
    const nodeCount = nodes.length; // Assuming 'nodes' is correctly defined and accessible
    const linkCount = links.length; // Use 'links' instead of 'edges'

    console.log(`Nodes: ${nodeCount}, Links: ${linkCount}`);
}

// Click event handler to toggle selection

// Example of how you would handle a click event to add nodes and links
function handleClick(event, d) {
    const selected = d3.select(this).classed("selected");
    d3.selectAll("circle").classed("selected", false); // Deselect all nodes

    if (!selected) {
        d3.select(this).classed("selected", true);
        selectionDisplay.text(`Selected: ${d.description || d.latex}`);

        if (d.type === "equation" && d.derivations) {
            const derivationNodesExist = nodes.some(node => d.derivations.some(derivation => derivation.id === node.id));

            if (!derivationNodesExist) {
                const centerX = d.x;
                const centerY = d.y;
                const radius = 150; // Increase radius to avoid overlap with the label
                const angleStep = (2 * Math.PI) / d.derivations.length;

                d.derivations.forEach((derivation, index) => {
                    const angle = index * angleStep;
                    const newX = centerX + radius * Math.cos(angle);
                    const newY = centerY + radius * Math.sin(angle);

                    const newNode = {
                        ...derivation,
                        x: newX,
                        y: newY,
                        type: "derivation",
                        parent: d.id
                    };

                    nodes.push(newNode);

                    const newLink = { source: d, target: newNode, isDerivationLink: true };
                    links.push(newLink);

                    appendLink(newLink);  // Append link to the linkGroup
                    appendNode(newNode);  // Append node and label to the nodeGroup and labelGroup
                });

                // Restart the simulation to incorporate the new nodes and links
                simulation.nodes(nodes);
                simulation.force("link").links(links);
                simulation.alpha(1).restart();

                // Batch LaTeX typesetting to reduce lag
                setTimeout(() => {
                    MathJax.typesetPromise().catch((err) => console.log(err.message));
                }, 100); // Delay to allow all nodes to be added before typesetting
            }
        }
    } else {
        selectionDisplay.text("No node selected");

        // Find and remove derivation nodes and their links related to the deselected equation node
        const nodesToRemove = nodes.filter(node => node.parent === d.id);
        nodesToRemove.forEach(node => {
            removeNode(node);
            nodes.splice(nodes.indexOf(node), 1);
        });

        const linksToRemove = links.filter(link => link.source.id === d.id && link.target.parent === d.id);
        linksToRemove.forEach(link => {
            removeLink(link);
            links.splice(links.indexOf(link), 1);
        });

        // Update the graph after removal
        simulation.nodes(nodes);
        simulation.force("link").links(links);
        simulation.alpha(1).restart();

        // Batch LaTeX typesetting after removal
        setTimeout(() => {
            MathJax.typesetPromise().catch((err) => console.log(err.message));
        }, 100); // Delay to allow all nodes to be removed before typesetting
    }
    updateCounts();
}







// Append nodes to the nodeGroup
function appendNode(newNode) {
    // Add node circles to the nodeGroup
    nodeGroup
        .selectAll("circle")
        .data([newNode], d => d.id)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("fill", d => {
            if (d.type === "equation") return "red";
            if (d.type === "derivation") return "yellow";
            if (d.type === "variable") return "blue";
            if (d.type === "constant") return "green";
        })
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleClick)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    // Add the LaTeX labels to the labelGroup
    labelGroup
        .selectAll("foreignObject")
        .data([newNode], d => d.id)
        .enter()
        .append("foreignObject")
        .attr("width", 100)
        .attr("height", 50)
        .attr("x", d => d.x + 20) // Adjusted position to avoid overlap
        .attr("y", d => d.y - 30)
        .html(d => `<div class="latex">${d.latex}</div>`);
}

// Append links to the linkGroup
function appendLink(newLink) {
    linkGroup
        .selectAll("line")
        .data([newLink], d => `${d.source.id}-${d.target.id}`)
        .enter()
        .append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6);
}

function removeNode(node) {
    svg.selectAll("circle").filter(d => d.id === node.id).remove();
    svg.selectAll("foreignObject").filter(d => d.id === node.id).remove();
}

function removeLink(link) {
    svg.selectAll("line").filter(d => d.source.id === link.source.id && d.target.id === link.target.id).remove();
}

simulation.on("tick", () => {
    svg.selectAll("line")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    svg.selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    svg.selectAll("foreignObject")
        .attr("x", d => d.x + 10)
        .attr("y", d => d.y + 2.5);

    // Call debounced typeset
    debouncedTypeset();
});


// Drag event functions
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    // Disable mouseover and mouseout events during drag
    d3.selectAll("circle").on("mouseover", null).on("mouseout", null);
    d3.select("#tooltip").remove();
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    // Re-enable mouseover and mouseout events after drag
    d3.selectAll("circle").on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
    // Render LaTeX after drag ends
    MathJax.typesetPromise();
}

// Tooltip functions
function handleMouseOver(event, d) {
    const tooltip = svg.append("text")
                       .attr("x", d.x + 15)
                       .attr("y", d.y - 10)
                       .attr("id", "tooltip")
                       .attr("font-size", "12px")
                       .attr("fill", "black")
                       .text(d.description);
}

function handleMouseOut() {
    d3.select("#tooltip").remove();
}

// Initial typeset
MathJax.typesetPromise();
