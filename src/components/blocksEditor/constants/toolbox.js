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
      name: "Control",
      colour: "210",
      contents: [
        {
          kind: "block",
          type: "controls_if",
        },
        {
          kind: "block",
          type: "comparison",
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
          type: "read_csv",
        },
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
          type: "count",
        },
        {
          kind: "block",
          type: "max",
        },
        {
          kind: "block",
          type: "min",
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
      colour: "80",
      contents: [
        {
          kind: "block",
          type: "line",
        },
        {
          kind: "block",
          type: "bar",
        },
        {
          kind: "block",
          type: "scatter",
        },
      ],
    },
  ],
};
