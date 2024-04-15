export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Text",
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
      contents: [
        {
          kind: "block",
          type: "controls_if",
        },
      ],
    },
    {
      kind: "category",
      name: "Custom",
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
          kind: "button",
          text: "Crear variable",
          callbackKey: "createVariableCallbackKey",
        },
        // {
        //   kind: "block",
        //   type: "variables_get",
        // },
        // {
        //   kind: "block",
        //   type: "variables_set",
        // },
      ],
    },
  ],
};
