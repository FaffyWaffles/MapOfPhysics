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
        { id: "E=mc^2", type: "equation", latex: "\\(E=mc^2\\)" },
        { id: "c", type: "constant", latex: "\\(c\\)" },
        { id: "m", type: "variable", latex: "\\(m\\)" },
        { id: "E", type: "variable", latex: "\\(E\\)" },
        { id: "F=ma", type: "equation", latex: "\\(F=ma\\)" },
        { id: "F", type: "variable", latex: "\\(F\\)" },
        { id: "a", type: "variable", latex: "\\(a\\)" },
        { id: "p=mv", type: "equation", latex: "\\(p=mv\\)" },
        { id: "p", type: "variable", latex: "\\(p\\)" },
        { id: "v", type: "variable", latex: "\\(v\\)" }
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

// Add nodes (circles) to the SVG
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
                .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended))
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);

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

// Update positions on each tick
simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);

    nodeLabels.attr("x", d => d.x + 10)
              .attr("y", d => d.y - 5)
              .html(d => `<div class="latex">${d.latex}</div>`);

    MathJax.typeset(); // Render LaTeX equations
});

// Drag event functions
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Tooltip functions
function handleMouseOver(event, d) {
    const tooltip = svg.append("text")
                       .attr("x", d.x + 15)
                       .attr("y", d.y - 10)
                       .attr("id", "tooltip")
                       .attr("font-size", "12px")
                       .attr("fill", "black")
                       .text(d.type);
}

function handleMouseOut() {
    d3.select("#tooltip").remove();
}
