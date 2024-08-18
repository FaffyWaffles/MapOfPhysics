// Define constants
const constants = [
    { id: "constant_c", type: "constant", latex: "\\(c\\)", description: "Speed of light in a vacuum" },
    { id: "constant_G", type: "constant", latex: "\\(G\\)", description: "Gravitational constant" },
    { id: "constant_h", type: "constant", latex: "\\(h\\)", description: "Planck constant" },
    { id: "constant_k", type: "constant", latex: "\\(k\\)", description: "Boltzmann constant" }
];

// Define variables
const variables = [
    { id: "variable_m", type: "variable", latex: "\\(m\\)", description: "Mass" },
    { id: "variable_E", type: "variable", latex: "\\(E\\)", description: "Energy" },
    { id: "variable_F", type: "variable", latex: "\\(F\\)", description: "Force" },
    { id: "variable_a", type: "variable", latex: "\\(a\\)", description: "Acceleration" },
    { id: "variable_p", type: "variable", latex: "\\(p\\)", description: "Momentum" },
    { id: "variable_v", type: "variable", latex: "\\(v\\)", description: "Velocity" },
    { id: "variable_r", type: "variable", latex: "\\(r\\)", description: "Distance" },
    { id: "variable_t", type: "variable", latex: "\\(t\\)", description: "Time" },
    { id: "variable_f", type: "variable", latex: "\\(f\\)", description: "Frequency" },
    { id: "variable_lambda", type: "variable", latex: "\\(\\lambda\\)", description: "Wavelength" },
    { id: "variable_T", type: "variable", latex: "\\(T\\)", description: "Temperature" },
    { id: "variable_S", type: "variable", latex: "\\(S\\)", description: "Entropy" },
    { id: "variable_Omega", type: "variable", latex: "\\(\\Omega\\)", description: "Number of microstates (in statistical mechanics)"},
    { id: "variable_P", type: "variable", latex: "\\(P\\)", description: "Pressure" },
    { id: "variable_V", type: "variable", latex: "\\(V\\)", description: "Volume" },
    { id: "variable_n", type: "variable", latex: "\\(n\\)", description: "Number of moles" },
    { id: "variable_W", type: "variable", latex: "\\(W\\)", description: "Work" },
    { id: "variable_Q", type: "variable", latex: "\\(Q\\)", description: "Heat" }
];

// Define equations
const equations = [
    { 
        id: "equation_MassEnergyEquivalence", 
        type: "equation", 
        latex: "\\(E=mc^2\\)", 
        description: "Mass-Energy equivalence formula", 
        variables: ["variable_E", "variable_m", "constant_c"]
    },
    { 
        id: "equation_NewtonSecondLaw", 
        type: "equation", 
        latex: "\\(F=ma\\)", 
        description: "Newton's Second Law of Motion", 
        variables: ["variable_F", "variable_m", "variable_a"]
    },
    { 
        id: "equation_LinearMomentum", 
        type: "equation", 
        latex: "\\(p=mv\\)", 
        description: "Linear Momentum formula", 
        variables: ["variable_p", "variable_m", "variable_v"]
    },
    { 
        id: "equation_EnergyMomentumEquivalence", 
        type: "equation", 
        latex: "\\(E^2 = (pc)^2 + (mc^2)^2\\)", 
        description: "Energy-Momentum Equivalence formula", 
        variables: ["variable_E", "variable_p", "variable_m", "constant_c"]
    },
    {
        id: "equation_NewtonGravitation",
        type: "equation",
        latex: "\\(F = G\\frac{m_1m_2}{r^2}\\)",
        description: "Newton's Law of Universal Gravitation",
        variables: ["variable_F", "variable_m", "variable_r", "constant_G"]
    },
    {
        id: "equation_PlanckEnergyQuantum",
        type: "equation",
        latex: "\\(E = hf\\)",
        description: "Planck's Energy Quantum formula",
        variables: ["variable_E", "variable_f", "constant_h"]
    },
    {
        id: "equation_WaveMechanics",
        type: "equation",
        latex: "\\(c = f\\lambda\\)",
        description: "Wave Mechanics relationship",
        variables: ["constant_c", "variable_f", "variable_lambda"]
    },
    {
        id: "equation_IdealGasLaw",
        type: "equation",
        latex: "\\(PV = nkT\\)",
        description: "Ideal Gas Law",
        variables: ["variable_P", "variable_V", "variable_n", "variable_T", "constant_k"]
    },
    {
        id: "equation_FirstLawThermodynamics",
        type: "equation",
        latex: "\\(\\Delta E = Q - W\\)",
        description: "First Law of Thermodynamics",
        variables: ["variable_E", "variable_Q", "variable_W"]
    },
    {
        id: "equation_SecondLawThermodynamics",
        type: "equation",
        latex: "\\(\\Delta S \\geq \\frac{Q}{T}\\)",
        description: "Second Law of Thermodynamics",
        variables: ["variable_S", "variable_Q", "variable_T"]
    },
    {
        id: "equation_EntropyStatistical",
        type: "equation",
        latex: "\\(S = k \\ln \\Omega\\)",
        description: "Statistical definition of Entropy",
        variables: ["variable_S", "variable_Omega", "constant_k"]
    },
    {
        id: "equation_TimeEnergyUncertainty",
        type: "equation",
        latex: "\\(\\Delta E \\Delta t \\geq \\frac{h}{4\\pi}\\)",
        description: "Time-Energy Uncertainty Principle",
        variables: ["variable_E", "variable_t", "constant_h"]
    },
    {
        id: "equation_KineticEnergy",
        type: "equation",
        latex: "\\(E_k = \\frac{1}{2}mv^2\\)",
        description: "Kinetic Energy",
        variables: ["variable_E", "variable_m", "variable_v"]
    },
    {
        id: "equation_DopplerEffect",
        type: "equation",
        latex: "\\(f' = f\\left(\\frac{c \\pm v_r}{c \\pm v_s}\\right)\\)",
        description: "Doppler Effect",
        variables: ["variable_f", "variable_v", "constant_c"]
    }
];

// Define relationships between equations
const equationRelationships = [
    {
        source: "equation_EnergyMomentumEquivalence",
        target: "equation_MassEnergyEquivalence",
        type: "reduces_to",
        description: "Reduces to E=mc² when momentum (p) is zero",
        visualProperties: {
            color: "orange",
            strokeWidth: 3,
            arrowhead: true
        }
    },
    {
        source: "equation_NewtonSecondLaw",
        target: "equation_LinearMomentum",
        type: "derivative_relationship",
        description: "F = dp/dt (Force is rate of change of momentum)",
        visualProperties: {
            color: "green",
            strokeWidth: 2,
            arrowhead: true
        }
    },
];

// Create nodes array
const nodes = [...constants, ...variables, ...equations];

// Create links array
const links = [];

// Add links between equations and their variables/constants
equations.forEach(eq => {
    eq.variables.forEach(variableId => {
        links.push({ source: eq.id, target: variableId, type: "variable" });
    });
});

// Add equation relationships to links
equationRelationships.forEach(rel => {
    links.push({
        source: rel.source,
        target: rel.target,
        type: rel.type,
        description: rel.description,
        visualProperties: rel.visualProperties
    });
});