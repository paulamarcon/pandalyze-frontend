import React, { useEffect, useState } from "react";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import CodeEditor from "./CodeEditor";
import CsvUploader from "./CsvUploader";

const Toolbox = () => {
  const [code, setCode] = useState('print("hola")');
  var useFront = true;

  var workspace;

  const toolbox = {
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
    ],
  };

  useEffect(() => {
    Blockly.Blocks["read_csv"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("day")
          .appendField(new Blockly.FieldDropdown(this.generateOptions), "DAY");
      },

      generateOptions: function () {
        var options = [];
        var now = Date.now();
        for (var i = 0; i < 7; i++) {
          var dateString = String(new Date(now)).substring(0, 3);
          options.push([dateString, dateString.toUpperCase()]);
          now += 24 * 60 * 60 * 1000;
        }
        return options;
      },
    };

    pythonGenerator.forBlock["read_csv"] = function (block, generator) {
      if (useFront) {
        return "front";
      } else {
        return "back";
      }
    };

    workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
    });

    workspace.addChangeListener(updateCode);
  }, []);

  const updateCode = (event) => {
    useFront = true;
    const frontendCode = pythonGenerator.workspaceToCode(workspace);

    useFront = false;
    const backendCode = pythonGenerator.workspaceToCode(workspace);

    setCode(frontendCode);
  };

  return (
    <>
      <CsvUploader />
      <div style={{ display: "flex", width: "100%", marginTop: "20px" }}>
        <div id="blocklyDiv" style={{ flex: 1, height: "680px" }}></div>
        <div style={{ flex: 1 }}>
          <CodeEditor code={code} />
        </div>
      </div>
    </>
  );
};

export default Toolbox;
