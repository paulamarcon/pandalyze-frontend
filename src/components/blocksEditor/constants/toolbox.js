export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Variables",
      custom: "VariablesCategory",
      colour: "#B48AE6",
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
      colour: "280",
      contents: [
        {
          kind: "block",
          type: "comparison",
        },
      ],
    },
    {
      kind: "category",
      name: "Primitivos",
      colour: "#4B168B",
      contents: [
        {
          kind: "block",
          type: "primitive_number",
        },
        {
          kind: "block",
          type: "primitive_text",
        },
        {
          kind: "block",
          type: "primitive_boolean",
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
      colour: "#D19C77",
      contents: [
        {
          kind: "block",
          type: "read_csv",
        },
        {
          kind: "block",
          type: "property",
        },
        {
          kind: "category",
          name: "Información",
          colour: "10",
          contents: [
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
              type: "describe",
            },
            {
              kind: "block",
              type: "dtypes",
            },
            {
              kind: "block",
              type: "column",
            },
            {
              kind: "block",
              type: "shape",
            },
          ],
        },
        {
          kind: "category",
          name: "Filtros",
          colour: "#5D4839",
          contents: [
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
            {
              kind: "block",
              type: "unique",
            },
            {
              kind: "block",
              type: "nullSum",
            },
          ],
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
        {
          kind: "block",
          type: "pie",
        },
      ],
    },
    {
      kind: "sep",
      gap: "8",
    },
    {
      kind: "category",
      name: "Salida",
      colour: "150",
      contents: [
        {
          kind: "block",
          type: "print_with_argument",
        },
        {
          kind: "block",
          type: "showInConsole",
        },
      ],
    },
  ],
};
