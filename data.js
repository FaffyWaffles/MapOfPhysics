const data = {
    nodes: [
        { id: "E=mc^2", type: "equation", forms: ["E=mc^2", "m=E/c^2"] },
        { id: "c", type: "constant" },
        { id: "m", type: "variable" },
        { id: "E", type: "variable" },
        { id: "F=ma", type: "equation", forms: ["F=ma", "a=F/m"] },
        { id: "F", type: "variable" },
        { id: "a", type: "variable" },
        { id: "p=mv", type: "equation", forms: ["p=mv", "v=p/m"] },
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
