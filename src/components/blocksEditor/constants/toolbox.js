export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Variables",
      custom: "VariablesCategory",
      colour: "280",
      contents: [
        {
          kind: "button",
          text: "Crear variable",
          callbackKey: "createVariableCallbackKey",
        },
      ],
    },
    {
      kind: "category",
      name: "Text",
      colour: "10",
      contents: [
        {
          kind: "block",
          type: "read_csv",
        },
      ],
    },
    {
      kind: "category",
      name: "Control",
      colour: "80",
      contents: [
        {
          kind: "block",
          type: "controls_if",
        },
      ],
    },
    {
      kind: "sep",
      gap: "8",
    },
    {
      kind: "category",
      name: "Pandas",
      colour: "160",
      contents: [
        {
          kind: "block",
          type: "print_with_argument",
        },
        {
          kind: "block",
          type: "head",
        },
        {
          kind: "block",
          type: "info",
        },
        {
          kind: "block",
          type: "mean",
        },
      ],
    },
    {
      kind: "sep",
      gap: "8",
    },
    {
      kind: "category",
      name: "Plotly",
      colour: "210",
    },
  ],
};
