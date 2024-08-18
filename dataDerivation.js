// Define constants
const constants = [
  { id: "constant_c", type: "constant", latex: "\\(c\\)", description: "Speed of light in a vacuum" }
];

// Define variables
const variables = [
  { id: "variable_m", type: "variable", latex: "\\(m\\)", description: "Mass" },
  { id: "variable_E", type: "variable", latex: "\\(E\\)", description: "Energy" },
  { id: "variable_F", type: "variable", latex: "\\(F\\)", description: "Force" },
  { id: "variable_a", type: "variable", latex: "\\(a\\)", description: "Acceleration" },
  { id: "variable_p", type: "variable", latex: "\\(p\\)", description: "Momentum" },
  { id: "variable_v", type: "variable", latex: "\\(v\\)", description: "Velocity" }
];

// Define equations
const equations = [
  { 
      id: "equation_MassEnergyEquivalence", 
      type: "equation", 
      latex: "\\(E=mc^2\\)", 
      description: "Mass-Energy equivalence formula", 
      variables: ["variable_E", "variable_m", "constant_c"],
      derivations: [
          { 
              id: "derivation_c_from_MassEnergyEquivalence", 
              latex: "\\(c = \\sqrt{\\frac{E}{m}}\\)", 
              description: "Derivation of speed of light from energy and mass", 
              derivedVariable: "constant_c" 
          },
          { 
              id: "derivation_m_from_MassEnergyEquivalence", 
              latex: "\\(m = \\frac{E}{c^2}\\)", 
              description: "Derivation of mass from energy and the speed of light", 
              derivedVariable: "variable_m" 
          },
      ]
  },
  { 
      id: "equation_NewtonSecondLaw", 
      type: "equation", 
      latex: "\\(F=ma\\)", 
      description: "Newton's Second Law of Motion", 
      variables: ["variable_F", "variable_m", "variable_a"],
      derivations: [
          { 
              id: "derivation_m_from_NewtonSecondLaw", 
              latex: "\\(m = \\frac{F}{a}\\)", 
              description: "Derivation of mass from force and acceleration", 
              derivedVariable: "variable_m" 
          },
          { 
              id: "derivation_a_from_NewtonSecondLaw", 
              latex: "\\(a = \\frac{F}{m}\\)", 
              description: "Derivation of acceleration from force and mass", 
              derivedVariable: "variable_a" 
          },
      ]
  },
  { 
      id: "equation_LinearMomentum", 
      type: "equation", 
      latex: "\\(p=mv\\)", 
      description: "Linear Momentum formula", 
      variables: ["variable_p", "variable_m", "variable_v"],
      derivations: [
          { 
              id: "derivation_m_from_LinearMomentum", 
              latex: "\\(m = \\frac{p}{v}\\)", 
              description: "Derivation of mass from momentum and velocity", 
              derivedVariable: "variable_m" 
          },
          { 
              id: "derivation_v_from_LinearMomentum", 
              latex: "\\(v = \\frac{p}{m}\\)", 
              description: "Derivation of velocity from momentum and mass", 
              derivedVariable: "variable_v" 
          },
      ]
  }
];

// Initial nodes (excluding derivations)
const nodes = [...constants, ...variables, ...equations];

// Links between equations and their variables/constants
const links = [];
equations.forEach(eq => {
  eq.variables.forEach(variableId => {
      links.push({ source: eq.id, target: variableId });
  });
});