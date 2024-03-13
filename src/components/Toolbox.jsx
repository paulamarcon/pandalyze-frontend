import React, { useEffect, useState } from "react";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import CodeEditor from "./CodeEditor";
import CsvUploader from "./CsvUploader";

const Toolbox = () => {
  const [frontendCode, setFrontendCode] = useState("_");
  const [backendCode, setBackendCode] = useState("_");
  const [csvInfo, setCsvInfo] = useState({ csvName: "", csvId: "" });

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
      const { csvName, csvId } = csvInfo;
      if (useFront) {
        return `
import pandas as pd

pd.read_csv(${csvName})`;
      } else {
        return `
import pandas as pd

csvId = getCsvById(${csvId})
df = pd.read_csv(csvId)
print(df)`;
      }
    };

    workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
    });

    workspace.addChangeListener(updateCode);
  }, [csvInfo]);

  const updateCode = (event) => {
    useFront = true;
    const frontendCode = pythonGenerator.workspaceToCode(workspace);
    setFrontendCode(frontendCode);
    console.log("frontendCode", frontendCode);

    useFront = false;
    // dudosa la linea 94. la 90 y 97 primero imprimen bien, pero cuando apreto el boton imprimen lo mismo (lo del front)
    const backendCode = pythonGenerator.workspaceToCode(workspace);

    setBackendCode(backendCode);
    console.log("backendCode", backendCode);
  };

  const updateOptions = () => {
    // Definir las nuevas opciones
    var newOptions = [["Alumnos.csv", "1"]];
    setCsvInfo({ csvName: newOptions[0][0], csvId: newOptions[0][1] });

    // Obtener el bloque dropdown y cambiar la función generateOptions
    Blockly.Blocks["read_csv"].generateOptions = function () {
      return newOptions;
    };

    // Actualizar los bloques en el workspace
    workspace = Blockly.getMainWorkspace();
    var blocksXML = Blockly.Xml.workspaceToDom(workspace);
    workspace.clear();
    Blockly.Xml.domToWorkspace(blocksXML, workspace);
  };

  return (
    <>
      <CsvUploader />

      {/* todo borrar este boton */}
      <button onClick={updateOptions}>Actualizar los dropdowns</button>

      <div style={{ display: "flex", width: "100%", marginTop: "20px" }}>
        <div id="blocklyDiv" style={{ flex: 1, height: "680px" }}></div>
        <div style={{ flex: 1 }}>
          <CodeEditor frontendCode={frontendCode} />
        </div>
      </div>
    </>
  );
};

export default Toolbox;
