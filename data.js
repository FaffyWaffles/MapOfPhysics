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

// Add a toggle button for line equations
const toggleButton = d3.select("#graph")
                       .insert("button", ":first-child")
                       .text("Toggle Line Equations")
                       .on("click", toggleLineEquations);

// Variable to track visibility of line equations
let lineEquationsVisible = true;

// Define the data structure with added derivations
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
        { id: "v", type: "variable", latex: "\\(v\\)", description: "Velocity" },
        { id: "t", type: "variable", latex: "\\(t\\)", description: "Time" },
        { id: "Delta t", type: "variable", latex: "\\(\\Delta t\\)", description: "Change in Time" },
        { id: "v_f = v_i + at", type: "equation", latex: "\\(v_f = v_i + at\\)", description: "Final velocity with initial velocity, acceleration and time" },
        { id: "a = (Delta v)/Delta t", type: "equation", latex: "\\(a = \\frac{\\Delta v}{\\Delta t}\\)", description: "Acceleration based on change in velocity over time" },
        { id: "DeltaV = v_f - v_i", type: "equation", latex: "\\(\\Delta v = v_f - v_i\\)", description: "Change in velocity" },
        { id: "DeltaT = t_f - t_i", type: "equation", latex: "\\(\\Delta t = t_f - t_i\\)", description: "Change in time" },
        { id: "j = da/dt", type: "equation", latex: "\\(j = \\frac{da}{dt}\\)", description: "Jerk as the derivative of acceleration with respect to time" },
        { id: "averageAcceleration", type: "equation", latex: "\\(\\overline{a} = \\frac{\\Delta v}{\\Delta t}\\)", description: "Average acceleration over a time period" },
        { id: "instantaneousAcceleration", type: "equation", latex: "\\(a(t) = \\frac{dv}{dt}\\)", description: "Instantaneous acceleration as the derivative of velocity with respect to time" },
        { id: "jerk", type: "variable", latex: "\\(j\\)", description: "Jerk" },
        { id: "deltaV", type: "variable", latex: "\\(\\Delta v\\)", description: "Change in Velocity" },
        { id: "average_a", type: "variable", latex: "\\(\\overline{a}\\)", description: "Average Acceleration" },
        { id: "v_i", type: "variable", latex: "\\(v_i\\)", description: "Initial Velocity" },
        { id: "v_f", type: "variable", latex: "\\(v_f\\)", description: "Final Velocity" },
        { id: "t_i", type: "variable", latex: "\\(t_i\\)", description: "Initial Time" },
        { id: "t_f", type: "variable", latex: "\\(t_f\\)", description: "Final Time" }
    ],
    links: [
        { source: "E=mc^2", target: "c", derivation: "\\(c = \\sqrt{E/m}\\)" },
        { source: "E=mc^2", target: "m", derivation: "\\(m = E/c^2\\)" },
        { source: "E=mc^2", target: "E", derivation: "\\(E = mc^2\\)" },
        { source: "F=ma", target: "F", derivation: "\\(F = ma\\)" },
        { source: "F=ma", target: "m", derivation: "\\(m = F/a\\)" },
        { source: "F=ma", target: "a", derivation: "\\(a = F/m\\)" },
        { source: "p=mv", target: "p", derivation: "\\(p = mv\\)" },
        { source: "p=mv", target: "m", derivation: "\\(m = p/v\\)" },
        { source: "p=mv", target: "v", derivation: "\\(v = p/m\\)" },
        { source: "v_f = v_i + at", target: "v_f", derivation: "\\(v_f = v_i + at\\)" },
        { source: "v_f = v_i + at", target: "v_i", derivation: "\\(v_i = v_f - at\\)" },
        { source: "v_f = v_i + at", target: "a", derivation: "\\(a = \\frac{v_f - v_i}{t}\\)" },
        { source: "v_f = v_i + at", target: "t", derivation: "\\(t = \\frac{v_f - v_i}{a}\\)" },
        { source: "a = (Delta v)/Delta t", target: "a", derivation: "\\(a = \\frac{\\Delta v}{\\Delta t}\\)" },
        { source: "a = (Delta v)/Delta t", target: "deltaV", derivation: "\\(\\Delta v = v_f - v_i\\)" },
        { source: "a = (Delta v)/Delta t", target: "Delta t", derivation: "\\(\\Delta t = t_f - t_i\\)" },
        { source: "DeltaV = v_f - v_i", target: "deltaV", derivation: "\\(\\Delta v = v_f - v_i\\)" },
        { source: "DeltaV = v_f - v_i", target: "v_f", derivation: "\\(\\Delta v = v_f - v_i\\)" },
        { source: "DeltaV = v_f - v_i", target: "v_i", derivation: "\\(\\Delta v = v_f - v_i\\)" },
        { source: "DeltaT = t_f - t_i", target: "Delta t", derivation: "\\(\\Delta t = t_f - t_i\\)" },
        { source: "DeltaT = t_f - t_i", target: "t_f", derivation: "\\(\\Delta t = t_f - t_i\\)" },
        { source: "DeltaT = t_f - t_i", target: "t_i", derivation: "\\(\\Delta t = t_f - t_i\\)" },
        { source: "averageAcceleration", target: "average_a", derivation: "\\(\\overline{a} = \\frac{\\Delta v}{\\Delta t}\\)" },
        { source: "averageAcceleration", target: "deltaV", derivation: "\\(\\overline{a} = \\frac{\\Delta v}{\\Delta t}\\)" },
        { source: "averageAcceleration", target: "Delta t", derivation: "\\(\\overline{a} = \\frac{\\Delta v}{\\Delta t}\\)" },
        { source: "instantaneousAcceleration", target: "a", derivation: "\\(a(t) = \\frac{dv}{dt}\\)" },
        { source: "instantaneousAcceleration", target: "v", derivation: "\\(a(t) = \\frac{dv}{dt}\\)" },
        { source: "j = da/dt", target: "a", derivation: "\\(j = \\frac{da}{dt}\\)" },
        { source: "j = da/dt", target: "jerk", derivation: "\\(j = \\frac{da}{dt}\\)" },
        { source: "j = da/dt", target: "t", derivation: "\\(j = \\frac{da}{dt}\\)" }
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

// Add derivation labels to the links
const linkLabels = svg.append("g")
                      .selectAll("foreignObject")
                      .data(data.links)
                      .enter().append("foreignObject")
                      .attr("width", 100)
                      .attr("height", 50)
                      .html(d => `<div class="latex">${d.derivation}</div>`);

// Add labels to the nodes and render LaTeX
const nodeLabels = svg.append("g")
                      .selectAll("foreignObject")
                      .data(data.nodes)
                      .enter().append("foreignObject")
                      .attr("width", 100)
                      .attr("height", 50)
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

    linkLabels.attr("x", d => (d.source.x + d.target.x) / 2 - 50)
              .attr("y", d => (d.source.y + d.target.y) / 2 - 25);

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

// Function to toggle line equations
function toggleLineEquations() {
    lineEquationsVisible = !lineEquationsVisible;
    linkLabels.style("display", lineEquationsVisible ? "block" : "none");
    MathJax.typesetPromise();
}

// Initial typeset
MathJax.typesetPromise();
