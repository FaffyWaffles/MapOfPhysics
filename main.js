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

    svg.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "-0 -5 10 10")
    .attr("refX", 10)  // Increased to push the arrow slightly away from the node
    .attr("refY", 0)
    .attr("orient", "auto")
    .attr("markerWidth", 8)  // Reduced from 13
    .attr("markerHeight", 8)  // Reduced from 13
    .attr("xoverflow", "visible")
    .append("svg:path")
    .attr("d", "M 0,-3 L 6 ,0 L 0,3")  // Adjusted path for a smaller triangle
    .attr("fill", "orange")
    .style("stroke", "none");

// Setup SVG groups for layering
const linkGroup = svg.append("g").attr("class", "links");
const labelGroup = svg.append("g").attr("class", "labels");
const nodeGroup = svg.append("g").attr("class", "nodes");

// Create a force simulation
const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id).distance(75))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2));

// Create selection display
const selectionDisplay = d3.select("#graph")
    .append("div")
    .attr("id", "selectionDisplay")
    .style("text-align", "center")
    .style("margin-top", "10px")
    .style("font-size", "18px")
    .text("No node selected");

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Update node and link counts
function updateCounts() {
    const nodeCount = simulation.nodes().length;
    const linkCount = simulation.force("link").links().length;
    console.log(`Nodes: ${nodeCount}, Links: ${linkCount}`);
}

// Handle node click events
function handleClick(event, d) {
    const selected = d3.select(this).classed("selected");
    d3.selectAll("circle").classed("selected", false);

    if (!selected) {
        d3.select(this).classed("selected", true);
        selectionDisplay.text(`Selected: ${d.description || d.latex}`);
    } else {
        selectionDisplay.text("No node selected");
    }
    updateCounts();
}

// Update the graph based on current simulation data
function updateGraph() {
    // Update links
    const link = linkGroup.selectAll("line")
        .data(simulation.force("link").links(), d => `${d.source.id}-${d.target.id}`);

    link.exit().remove();

    link.enter().append("line")
        .merge(link)
        .attr("stroke", d => d.visualProperties ? d.visualProperties.color : "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", d => d.visualProperties ? d.visualProperties.strokeWidth : 2)
        .attr("marker-end", d => d.visualProperties && d.visualProperties.arrowhead ? "url(#arrowhead)" : null);

    // Update nodes
    const node = nodeGroup.selectAll("circle")
        .data(simulation.nodes(), d => d.id);

    node.exit().remove();

    node.enter().append("circle")
        .attr("r", 10)
        .attr("fill", getNodeColor)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleClick)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .merge(node);

    // Update labels
    const label = labelGroup.selectAll("foreignObject")
        .data(simulation.nodes(), d => d.id);

    label.exit().remove();

    label.enter().append("foreignObject")
        .attr("width", 200)
        .attr("height", 100)
        .html(d => `<div class="latex">${d.latex || d.description}</div>`)
        .merge(label);

    // Restart the simulation
    simulation.alpha(1).restart();
    debouncedTypeset();
    updateCounts();
}

// Get node color based on type
function getNodeColor(d) {
    const colors = {
        "equation": "red",
        "variable": "blue",
        "constant": "green"
    };
    return colors[d.type] || "gray";
}

// Drag event handlers
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(1).restart();
    d.fx = d.x;
    d.fy = d.y;
    d3.select(this).raise().attr("stroke", "black");
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.01);
    d.fx = null;
    d.fy = null;
    d3.select(this).attr("stroke", null);
    
    // Delay the MathJax typesetting
    setTimeout(() => {
        debouncedTypeset();
    }, 500);
}

// Tooltip handlers
function handleMouseOver(event, d) {
    svg.append("text")
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

// Update positions on each tick
simulation.on("tick", () => {
    linkGroup.selectAll("line")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    nodeGroup.selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    labelGroup.selectAll("foreignObject")
        .attr("x", d => d.x + 10)
        .attr("y", d => d.y - 5);
});

// Separate function for updating MathJax
function updateMathJax() {
    labelGroup.selectAll("foreignObject")
        .each(function() {
            MathJax.typesetPromise([this]).catch((err) => console.log(err.message));
        });
}

// Debounced MathJax typeset function
const debouncedTypeset = debounce(updateMathJax, 300);

// Initialize the graph
function initializeGraph(nodes, links) {
    simulation.nodes(nodes);
    simulation.force("link").links(links);

    updateGraph();
}

// Assuming 'nodes' and 'links' are defined in data.js
initializeGraph(nodes, links);