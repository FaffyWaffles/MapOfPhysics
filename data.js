// Define constants
const constants = [
    { id: "constant_speedOfLightInVacuum", type: "constant", latex: "\\(c\\)", description: "Speed of light in a vacuum", syntax: "c" },
    { id: "constant_gravitationalConstant", type: "constant", latex: "\\(G\\)", description: "Gravitational constant", syntax: "G" },
    { id: "constant_planckConstant", type: "constant", latex: "\\(h\\)", description: "Planck constant", syntax: "h" },
    { id: "constant_boltzmannConstant", type: "constant", latex: "\\(k\\)", description: "Boltzmann constant", syntax: "k" },
    { id: "constant_permittivityOfFreeSpace", type: "constant", latex: "\\(\\varepsilon_0\\)", description: "Permittivity of free space", syntax: "ε₀" },
    { id: "constant_permeabilityOfFreeSpace", type: "constant", latex: "\\(\\mu_0\\)", description: "Permeability of free space", syntax: "μ₀" },
    { id: "constant_coulombConstant", type: "constant", latex: "\\(k_e\\)", description: "Coulomb constant", syntax: "k_e" }
];

// Define variables
const variables = [
    { id: "variable_mass", type: "variable", latex: "\\(m\\)", description: "Mass", syntax: "m" },
    { id: "variable_energy", type: "variable", latex: "\\(E\\)", description: "Energy", syntax: "E" },
    { id: "variable_force", type: "variable", latex: "\\(F\\)", description: "Force", syntax: "F" },
    { id: "variable_acceleration", type: "variable", latex: "\\(a\\)", description: "Acceleration", syntax: "a" },
    { id: "variable_momentum", type: "variable", latex: "\\(p\\)", description: "Momentum", syntax: "p" },
    { id: "variable_velocity", type: "variable", latex: "\\(v\\)", description: "Velocity", syntax: "v" },
    { id: "variable_distance", type: "variable", latex: "\\(r\\)", description: "Distance", syntax: "r" },
    { id: "variable_time", type: "variable", latex: "\\(t\\)", description: "Time", syntax: "t" },
    { id: "variable_frequency", type: "variable", latex: "\\(f\\)", description: "Frequency", syntax: "f" },
    { id: "variable_wavelength", type: "variable", latex: "\\(\\lambda\\)", description: "Wavelength", syntax: "λ" },
    { id: "variable_temperature", type: "variable", latex: "\\(T\\)", description: "Temperature", syntax: "T" },
    { id: "variable_entropy", type: "variable", latex: "\\(S\\)", description: "Entropy", syntax: "S" },
    { id: "variable_numberOfMicrostates", type: "variable", latex: "\\(\\Omega\\)", description: "Number of microstates (in statistical mechanics)", syntax: "Ω" },
    { id: "variable_pressure", type: "variable", latex: "\\(P\\)", description: "Pressure", syntax: "P" },
    { id: "variable_volume", type: "variable", latex: "\\(V\\)", description: "Volume", syntax: "V" },
    { id: "variable_numberOfMoles", type: "variable", latex: "\\(n\\)", description: "Number of moles", syntax: "n" },
    { id: "variable_work", type: "variable", latex: "\\(W\\)", description: "Work", syntax: "W" },
    { id: "variable_heat", type: "variable", latex: "\\(Q\\)", description: "Heat", syntax: "Q" },
    { id: "variable_electricCharge", type: "variable", latex: "\\(q\\)", description: "Electric charge", syntax: "q" },
    { id: "variable_electricFieldStrength", type: "variable", latex: "\\(E\\)", description: "Electric field strength", syntax: "E" },
    { id: "variable_magneticFieldStrength", type: "variable", latex: "\\(B\\)", description: "Magnetic field strength", syntax: "B" },
    { id: "variable_current", type: "variable", latex: "\\(I\\)", description: "Current", syntax: "I" },
    { id: "variable_resistance", type: "variable", latex: "\\(R\\)", description: "Resistance", syntax: "R" },
    { id: "variable_waveFunction", type: "variable", latex: "\\(\\psi\\)", description: "Wave function in quantum mechanics", syntax: "ψ" },
    { id: "variable_voltage", type: "variable", latex: "\\(V\\)", description: "Voltage (Electric potential difference)", syntax: "V" },
    { id: "variable_chargeDensity", type: "variable", latex: "\\(\\rho\\)", description: "Charge density", syntax: "ρ" },
    { id: "variable_electricFlux", type: "variable", latex: "\\(\\Phi_E\\)", description: "Electric flux", syntax: "Φ_E" },
    { id: "variable_electricPotentialEnergy", type: "variable", latex: "\\(U\\)", description: "Electric potential energy", syntax: "U" },
    { id: "variable_area", type: "variable", latex: "\\(A\\)", description: "Area", syntax: "A" },
    { id: "variable_capacitance", type: "variable", latex: "\\(C\\)", description: "Capacitance", syntax: "C" },
    { id: "variable_currentDensity", type: "variable", latex: "\\(J\\)", description: "Current density", syntax: "J" }
];

// Define equations
const equations = [
    { 
        id: "equation_MassEnergyEquivalence", 
        type: "equation", 
        latex: "\\(E=mc^2\\)", 
        description: "Mass-Energy equivalence formula", 
        variables: ["variable_energy", "variable_mass", "constant_speedOfLightInVacuum"]
    },
    { 
        id: "equation_NewtonSecondLaw", 
        type: "equation", 
        latex: "\\(F=ma\\)", 
        description: "Newton's Second Law of Motion", 
        variables: ["variable_force", "variable_mass", "variable_acceleration"]
    },
    { 
        id: "equation_LinearMomentum", 
        type: "equation", 
        latex: "\\(p=mv\\)", 
        description: "Linear Momentum formula", 
        variables: ["variable_momentum", "variable_mass", "variable_velocity"]
    },
    { 
        id: "equation_EnergyMomentumEquivalence", 
        type: "equation", 
        latex: "\\(E^2 = (pc)^2 + (mc^2)^2\\)", 
        description: "Energy-Momentum Equivalence formula", 
        variables: ["variable_energy", "variable_momentum", "variable_mass", "constant_speedOfLightInVacuum"]
    },
    {
        id: "equation_NewtonGravitation",
        type: "equation",
        latex: "\\(F = G\\frac{m_1m_2}{r^2}\\)",
        description: "Newton's Law of Universal Gravitation",
        variables: ["variable_force", "variable_mass", "variable_distance", "constant_gravitationalConstant"]
    },
    {
        id: "equation_PlanckEnergyQuantum",
        type: "equation",
        latex: "\\(E = hf\\)",
        description: "Planck's Energy Quantum formula",
        variables: ["variable_energy", "variable_frequency", "constant_planckConstant"]
    },
    {
        id: "equation_WaveMechanics",
        type: "equation",
        latex: "\\(c = f\\lambda\\)",
        description: "Wave Mechanics relationship",
        variables: ["constant_speedOfLightInVacuum", "variable_frequency", "variable_wavelength"]
    },
    {
        id: "equation_IdealGasLaw",
        type: "equation",
        latex: "\\(PV = nkT\\)",
        description: "Ideal Gas Law",
        variables: ["variable_pressure", "variable_volume", "variable_numberOfMoles", "variable_temperature", "constant_boltzmannConstant"]
    },
    {
        id: "equation_FirstLawThermodynamics",
        type: "equation",
        latex: "\\(\\Delta E = Q - W\\)",
        description: "First Law of Thermodynamics",
        variables: ["variable_energy", "variable_heat", "variable_work"]
    },
    {
        id: "equation_SecondLawThermodynamics",
        type: "equation",
        latex: "\\(\\Delta S \\geq \\frac{Q}{T}\\)",
        description: "Second Law of Thermodynamics",
        variables: ["variable_entropy", "variable_heat", "variable_temperature"]
    },
    {
        id: "equation_EntropyStatistical",
        type: "equation",
        latex: "\\(S = k \\ln \\Omega\\)",
        description: "Statistical definition of Entropy",
        variables: ["variable_entropy", "variable_numberOfMicrostates", "constant_boltzmannConstant"]
    },
    {
        id: "equation_TimeEnergyUncertainty",
        type: "equation",
        latex: "\\(\\Delta E \\Delta t \\geq \\frac{h}{4\\pi}\\)",
        description: "Time-Energy Uncertainty Principle",
        variables: ["variable_energy", "variable_time", "constant_planckConstant"]
    },
    {
        id: "equation_KineticEnergy",
        type: "equation",
        latex: "\\(E_k = \\frac{1}{2}mv^2\\)",
        description: "Kinetic Energy",
        variables: ["variable_energy", "variable_mass", "variable_velocity"]
    },
    {
        id: "equation_DopplerEffect",
        type: "equation",
        latex: "\\(f' = f\\left(\\frac{c \\pm v_r}{c \\pm v_s}\\right)\\)",
        description: "Doppler Effect",
        variables: ["variable_frequency", "variable_velocity", "constant_speedOfLightInVacuum"]
    },
    {
        id: "equation_CoulombLaw",
        type: "equation",
        latex: "\\(F = k_e \\frac{q_1 q_2}{r^2}\\)",
        description: "Coulomb's Law",
        variables: ["variable_force", "variable_electricCharge", "variable_distance", "constant_coulombConstant"]
    },
    {
        id: "equation_OhmLaw",
        type: "equation",
        latex: "\\(V = IR\\)",
        description: "Ohm's Law",
        variables: ["variable_voltage", "variable_current", "variable_resistance"]
    },
    {
        id: "equation_BiotSavart",
        type: "equation",
        latex: "\\(B = \\frac{\\mu_0}{4\\pi} \\int \\frac{I \\times dl}{r^2}\\)",
        description: "Biot-Savart Law",
        variables: ["variable_magneticFieldStrength", "variable_current", "variable_distance", "constant_permeabilityOfFreeSpace"]
    },
    {
        id: "equation_GaussElectric",
        type: "equation",
        latex: "\\(\\nabla \\cdot E = \\frac{\\rho}{\\varepsilon_0}\\)",
        description: "Gauss's Law for Electricity",
        variables: ["variable_electricFieldStrength", "variable_chargeDensity", "constant_permittivityOfFreeSpace"]
    },
    {
        id: "equation_WaveEquation",
        type: "equation",
        latex: "\\(\\frac{\\partial^2 \\psi}{\\partial t^2} = v^2 \\nabla^2 \\psi\\)",
        description: "Wave Equation",
        variables: ["variable_velocity", "variable_time", "variable_waveFunction"]
    },
    {
        id: "equation_ElectricFlux",
        type: "equation",
        latex: "\\(\\Phi_E = E \\cdot A\\)",
        description: "Electric Flux",
        variables: ["variable_electricFlux", "variable_electricFieldStrength", "variable_area"]
    },
    {
        id: "equation_GaussLawIntegralForm",
        type: "equation",
        latex: "\\(\\oint_{S} \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{q_{enc}}{\\varepsilon_0}\\)",
        description: "Gauss's Law for Electricity (Integral Form)",
        variables: ["variable_electricFieldStrength", "variable_electricCharge", "variable_area", "constant_permittivityOfFreeSpace"]
    },
    {
        id: "equation_ElectricPotentialEnergy",
        type: "equation",
        latex: "\\(U = \\frac{k_e q_1 q_2}{r}\\)",
        description: "Electric Potential Energy between two point charges",
        variables: ["variable_electricPotentialEnergy", "variable_electricCharge", "variable_distance", "constant_coulombConstant"]
    },
    {
        id: "equation_ElectricPotential",
        type: "equation",
        latex: "\\(V = \\frac{U}{q}\\)",
        description: "Electric Potential",
        variables: ["variable_voltage", "variable_electricPotentialEnergy", "variable_electricCharge"]
    },
    {
        id: "equation_Capacitance",
        type: "equation",
        latex: "\\(C = \\frac{q}{V}\\)",
        description: "Capacitance",
        variables: ["variable_capacitance", "variable_electricCharge", "variable_voltage"]
    },
    {
        id: "equation_CapacitorEnergy",
        type: "equation",
        latex: "\\(U = \\frac{1}{2}CV^2\\)",
        description: "Energy Stored in a Capacitor",
        variables: ["variable_electricPotentialEnergy", "variable_capacitance", "variable_voltage"]
    },
    {
        id: "equation_RelationElectricFieldPotential",
        type: "equation",
        latex: "\\(E = -\\nabla V\\)",
        description: "Relationship between Electric Field and Electric Potential",
        variables: ["variable_electricFieldStrength", "variable_voltage"]
    },
    {
        id: "equation_GaussLawMagnetism",
        type: "equation",
        latex: "\\(\\nabla \\cdot B = 0\\)",
        description: "Gauss's Law for Magnetism",
        variables: ["variable_magneticFieldStrength"]
    },
    {
        id: "equation_FaradayLaw",
        type: "equation",
        latex: "\\(\\nabla \\times E = -\\frac{\\partial B}{\\partial t}\\)",
        description: "Faraday's Law of Induction",
        variables: ["variable_electricFieldStrength", "variable_magneticFieldStrength", "variable_time"]
    },
    {
        id: "equation_AmpereMaxwell",
        type: "equation",
        latex: "\\(\\nabla \\times B = \\mu_0 J + \\mu_0 \\varepsilon_0 \\frac{\\partial E}{\\partial t}\\)",
        description: "Ampère-Maxwell Law",
        variables: ["variable_magneticFieldStrength", "variable_currentDensity", "variable_electricFieldStrength", "variable_time", "constant_permeabilityOfFreeSpace", "constant_permittivityOfFreeSpace"]
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