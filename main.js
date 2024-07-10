// Set up the SVG canvas dimensions
const width = 1000;
const height = 800;

// Create an SVG element and append it to the div with id "graph"
const svg = d3.select("#graph")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .style("border", "1px solid black")
              .style("display", "block")  // Added to center the canvas
              .style("margin", "auto")    // Added to center the canvas
              .call(d3.zoom().on("zoom", (event) => {
                  svg.attr("transform", event.transform);
              }))
              .append("g");

// Define the data structure with added derivations and equivalent equation links
const data = {
    nodes: [
        { id: "equation_E_mc2", type: "equation", latex: "\\(E=mc^2\\)", description: "Energy-mass equivalence formula" },
        { id: "constant_c", type: "constant", latex: "\\(c\\)", description: "Speed of light in a vacuum" },
        { id: "variable_m", type: "variable", latex: "\\(m\\)", description: "Mass of an object" },
        { id: "variable_E", type: "variable", latex: "\\(E\\)", description: "Energy" },
        { id: "equation_F_ma", type: "equation", latex: "\\(F=ma\\)", description: "Newton's second law of motion" },
        { id: "variable_F", type: "variable", latex: "\\(F\\)", description: "Force" },
        { id: "variable_a", type: "variable", latex: "\\(a\\)", description: "Acceleration" },
        { id: "equation_p_mv", type: "equation", latex: "\\(p=mv\\)", description: "Momentum formula" },
        { id: "variable_p", type: "variable", latex: "\\(p\\)", description: "Momentum" },
        { id: "variable_v", type: "variable", latex: "\\(v\\)", description: "Velocity" },
        // Adding derivation nodes
        { id: "derivation_c_from_E_and_m", type: "derivation", latex: "\\(c = \\sqrt{\\frac{E}{m}}\\)", description: "Derivation of speed of light" },
        { id: "derivation_m_from_E_and_c", type: "derivation", latex: "\\(m = \\frac{E}{c^2}\\)", description: "Derivation of mass from energy" },
        { id: "derivation_m_from_F_and_a", type: "derivation", latex: "\\(m = \\frac{F}{a}\\)", description: "Derivation of mass from force" },
        { id: "derivation_m_from_p_and_v", type: "derivation", latex: "\\(m = \\frac{p}{v}\\)", description: "Derivation of mass from momentum" },
        { id: "derivation_a_from_F_and_m", type: "derivation", latex: "\\(a = \\frac{F}{m}\\)", description: "Derivation of acceleration" },
        { id: "derivation_v_from_p_and_m", type: "derivation", latex: "\\(v = \\frac{p}{m}\\)", description: "Derivation of velocity" }
    ],
    links: [
        { source: "equation_E_mc2", target: "derivation_c_from_E_and_m" },
        { source: "equation_E_mc2", target: "derivation_m_from_E_and_c" },
        { source: "equation_E_mc2", target: "variable_E" },
        { source: "derivation_c_from_E_and_m", target: "constant_c" },
        { source: "derivation_m_from_E_and_c", target: "variable_m" },
        { source: "equation_F_ma", target: "variable_F" },
        { source: "equation_F_ma", target: "derivation_m_from_F_and_a" },
        { source: "equation_F_ma", target: "derivation_a_from_F_and_m" },
        { source: "derivation_m_from_F_and_a", target: "variable_m" },
        { source: "derivation_a_from_F_and_m", target: "variable_a" },
        { source: "equation_p_mv", target: "variable_p" },
        { source: "equation_p_mv", target: "derivation_m_from_p_and_v" },
        { source: "equation_p_mv", target: "derivation_v_from_p_and_m" },
        { source: "derivation_m_from_p_and_v", target: "variable_m" },
        { source: "derivation_v_from_p_and_m", target: "variable_v" },
        // Adding equivalent equation links
        { source: "derivation_a_from_F_and_m", target: "derivation_m_from_F_and_a" },
        { source: "derivation_m_from_F_and_a", target: "derivation_a_from_F_and_m" },
        { source: "derivation_m_from_p_and_v", target: "derivation_v_from_p_and_m" },
        { source: "derivation_v_from_p_and_m", target: "derivation_m_from_p_and_v" },
        { source: "derivation_c_from_E_and_m", target: "derivation_m_from_E_and_c" },
        { source: "derivation_m_from_E_and_c", target: "derivation_c_from_E_and_m" }
    ]
};

// Create a force simulation
const simulation = d3.forceSimulation(data.nodes)
                     .force("link", d3.forceLink(data.links).id(d => d.id).distance(75))
                     .force("charge", d3.forceManyBody().strength(-500))
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
                      .html(d => `<div class="latex">${d.latex}</div>`); // Keeping LaTeX styling simple

// Add nodes (circles) to the SVG above the labels
const node = svg.append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(data.nodes)
                .enter().append("circle")
                .attr("r", 10)
                .attr("fill", d => {
                    if (d.type === "equation") return "red"; // Main equation nodes in red
                    if (d.type === "derivation") return "yellow"; // New color for derivation nodes
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
