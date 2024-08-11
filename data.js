const data = {
    nodes: [
        // Constants
        { id: "constant_c", type: "constant", latex: "\\(c\\)", description: "Speed of light in a vacuum" },
        // Variables
        { id: "variable_m", type: "variable", latex: "\\(m\\)", description: "Mass" },
        { id: "variable_E", type: "variable", latex: "\\(E\\)", description: "Energy" },
        { id: "variable_F", type: "variable", latex: "\\(F\\)", description: "Force" },
        { id: "variable_a", type: "variable", latex: "\\(a\\)", description: "Acceleration" },
        { id: "variable_p", type: "variable", latex: "\\(p\\)", description: "Momentum" },
        { id: "variable_v", type: "variable", latex: "\\(v\\)", description: "Velocity" },
        // Equations
        { id: "equation_MassEnergyEquivalence", type: "equation", latex: "\\(E=mc^2\\)", description: "Mass-Energy equivalence formula" },
        { id: "equation_NewtonSecondLaw", type: "equation", latex: "\\(F=ma\\)", description: "Newton's Second Law of Motion" },
        { id: "equation_LinearMomentum", type: "equation", latex: "\\(p=mv\\)", description: "Linear Momentum formula" },
        // Derivations
        { id: "derivation_c_from_MassEnergyEquivalence", type: "derivation", latex: "\\(c = \\sqrt{\\frac{E}{m}}\\)", description: "Derivation of speed of light from energy and mass" },
        { id: "derivation_m_from_MassEnergyEquivalence", type: "derivation", latex: "\\(m = \\frac{E}{c^2}\\)", description: "Derivation of mass from energy and the speed of light" },
        { id: "derivation_m_from_NewtonSecondLaw", type: "derivation", latex: "\\(m = \\frac{F}{a}\\)", description: "Derivation of mass from force and acceleration" },
        { id: "derivation_m_from_LinearMomentum", type: "derivation", latex: "\\(m = \\frac{p}{v}\\)", description: "Derivation of mass from momentum and velocity" },
        { id: "derivation_a_from_NewtonSecondLaw", type: "derivation", latex: "\\(a = \\frac{F}{m}\\)", description: "Derivation of acceleration from force and mass" },
        { id: "derivation_v_from_LinearMomentum", type: "derivation", latex: "\\(v = \\frac{p}{m}\\)", description: "Derivation of velocity from momentum and mass" }
    ],
    links: [
        { source: "equation_MassEnergyEquivalence", target: "derivation_c_from_MassEnergyEquivalence" },
        { source: "equation_MassEnergyEquivalence", target: "derivation_m_from_MassEnergyEquivalence" },
        { source: "equation_MassEnergyEquivalence", target: "variable_E" },
        { source: "derivation_c_from_MassEnergyEquivalence", target: "constant_c" },
        { source: "derivation_m_from_MassEnergyEquivalence", target: "variable_m" },
        { source: "equation_NewtonSecondLaw", target: "variable_F" },
        { source: "equation_NewtonSecondLaw", target: "derivation_m_from_NewtonSecondLaw" },
        { source: "equation_NewtonSecondLaw", target: "derivation_a_from_NewtonSecondLaw" },
        { source: "derivation_m_from_NewtonSecondLaw", target: "variable_m" },
        { source: "derivation_a_from_NewtonSecondLaw", target: "variable_a" },
        { source: "equation_LinearMomentum", target: "variable_p" },
        { source: "equation_LinearMomentum", target: "derivation_m_from_LinearMomentum" },
        { source: "equation_LinearMomentum", target: "derivation_v_from_LinearMomentum" },
        { source: "derivation_m_from_LinearMomentum", target: "variable_m" },
        { source: "derivation_v_from_LinearMomentum", target: "variable_v" },
        // Adding equivalent equation links
        { source: "derivation_a_from_NewtonSecondLaw", target: "derivation_m_from_NewtonSecondLaw" },
        { source: "derivation_m_from_NewtonSecondLaw", target: "derivation_a_from_NewtonSecondLaw" },
        { source: "derivation_m_from_LinearMomentum", target: "derivation_v_from_LinearMomentum" },
        { source: "derivation_v_from_LinearMomentum", target: "derivation_m_from_LinearMomentum" },
        { source: "derivation_c_from_MassEnergyEquivalence", target: "derivation_m_from_MassEnergyEquivalence" },
        { source: "derivation_m_from_MassEnergyEquivalence", target: "derivation_c_from_MassEnergyEquivalence" }
    ]
};