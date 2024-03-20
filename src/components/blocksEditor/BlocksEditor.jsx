import React, { useEffect, useState } from "react";
import CsvUploader from "../csvUploader/CsvUploader";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { toolbox } from "./constants";

const BlocksEditor = ({ updateCode }) => {
  const [csvResponse, setCsvResponse] = useState({ csvName: "", csvId: "" });
  var workspace;
  var useFront;

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
      const { csvName, csvId } = csvResponse;
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

    workspace.addChangeListener(onBlocksChange);
  }, []);

  const onBlocksChange = (event) => {
    //TODO ojo con esta linea
    const workspace = Blockly.getMainWorkspace();

    useFront = true;
    const frontendCode = pythonGenerator.workspaceToCode(workspace);

    useFront = false;
    const backendCode = pythonGenerator.workspaceToCode(workspace);

    updateCode(frontendCode, backendCode);
  };

  const updateDropdownOptions = (newOptions) => {
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
      <CsvUploader
        setCsvResponse={setCsvResponse}
        updateDropdownOptions={updateDropdownOptions}
      />

      <div id="blocklyDiv" style={{ flex: 1, height: "680px" }}></div>
    </>
  );
};

export default BlocksEditor;
