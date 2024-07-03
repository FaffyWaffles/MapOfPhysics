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
        { id: "E=mc^2", type: "equation" },
        { id: "c", type: "constant" },
        { id: "m", type: "variable" },
        { id: "E", type: "variable" },
        { id: "F=ma", type: "equation" },
        { id: "F", type: "variable" },
        { id: "a", type: "variable" },
        { id: "p=mv", type: "equation" },
        { id: "p", type: "variable" },
        { id: "v", type: "variable" }
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
                     .force("link", d3.forceLink(data.links).id(d => d.id))
                     .force("charge", d3.forceManyBody())
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
                        .on("end", dragended));

// Add labels to the nodes
const nodeLabels = svg.append("g")
                      .selectAll("text")
                      .data(data.nodes)
                      .enter().append("text")
                      .attr("font-size", "10px")
                      .attr("fill", "black")
                      .text(d => d.id);

// Update positions on each tick
simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);

    nodeLabels.attr("x", d => d.x + 10)
              .attr("y", d => d.y + 3);
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
