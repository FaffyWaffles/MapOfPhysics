// Set up the SVG canvas dimensions
const width = 800;
const height = 600;

// Create an SVG element and append it to the div with id "graph"
const svg = d3.select("#graph")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .style("border", "1px solid black")
              .call(d3.zoom().on("zoom", (event) => {
                  svg.attr("transform", event.transform);
              }))
              .append("g");

// Define the data structure
const data = {
    nodes: [
        { id: "E=mc^2", type: "equation", latex: "\\(E=mc^2\\)", description: "Energy-mass equivalence formula by Einstein" },
        { id: "c", type: "constant", latex: "\\(c\\)", description: "Speed of light in a vacuum" },
        { id: "m", type: "variable", latex: "\\(m\\)", description: "Mass of an object" },
        { id: "E", type: "variable", latex: "\\(E\\)", description: "Energy" },
        { id: "F=ma", type: "equation", latex: "\\(F=ma\\)", description: "Newton's second law of motion" },
        { id: "F", type: "variable", latex: "\\(F\\)", description: "Force" },
        { id: "a", type: "variable", latex: "\\(a\\)", description: "Acceleration" },
        { id: "p=mv", type: "equation", latex: "\\(p=mv\\)", description: "Momentum formula" },
        { id: "p", type: "variable", latex: "\\(p\\)", description: "Momentum" },
        { id: "v", type: "variable", latex: "\\(v\\)", description: "Velocity" }
    ],
    links: [
        { source: "E=mc^2", target: "c" },
        { source: "E=mc^2", target: "m" },
        { source: "E=mc^2", target: "E" },
        { source: "F=ma", target: "F" },
        { source: "F=ma", target: "m" },
        { source: "F=ma", target: "a" },
        { source: "p=mv", target: "p" },
        { source: "p=mv", target: "m" },
        { source: "p=mv", target: "v" }
    ]
};

// Create a force simulation
const simulation = d3.forceSimulation(data.nodes)
                     .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
                     .force("charge", d3.forceManyBody().strength(-300))
                     .force("center", d3.forceCenter(width / 2, height / 2));

// Add links (lines) to the SVG
const link = svg.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(data.links)
                .enter().append("line")
                .attr("stroke-width", 2);

// Add labels to the nodes and render LaTeX
const nodeLabels = svg.append("g")
                      .selectAll("foreignObject")
                      .data(data.nodes)
                      .enter().append("foreignObject")
                      .attr("width", 100)
                      .attr("height", 50)
                      .attr("x", d => d.x + 10)
                      .attr("y", d => d.y - 5)
                      .html(d => `<div class="latex">${d.latex}</div>`);

// Add nodes (circles) to the SVG above the labels
const node = svg.append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(data.nodes)
                .enter().append("circle")
                .attr("r", 10)
                .attr("fill", d => {
                    if (d.type === "equation") return "red";
                    if (d.type === "variable") return "blue";
                    if (d.type === "constant") return "green";
                })
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)
                .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));

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
const debouncedTypeset = debounce(() => MathJax.typesetPromise(), 500);

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