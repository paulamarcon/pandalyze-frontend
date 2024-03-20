import React, { useEffect, useState } from "react";
import CsvUploader from "../csvUploader/CsvUploader";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { toolbox } from "./constants";

const BlocksEditor = ({ updateCode }) => {
  const [csvResponse, setCsvResponse] = useState([["Alumnos", "1"]]);
  var workspace;
  var useFront;

  useEffect(() => {
    Blockly.Blocks["read_csv"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("csvs")
          .appendField(
            new Blockly.FieldDropdown(this.generateOptions),
            "csvOptions"
          );
      },

      generateOptions: function () {
        const defaultCsv = csvResponse[0];
        return [[defaultCsv[0], defaultCsv[1]]];
      },
    };

    pythonGenerator.forBlock["read_csv"] = function (block, generator) {
      var selectedKey = block.getFieldValue("csvOptions");
      var selectedValue = block.getField("csvOptions").getText();

      if (useFront) {
        return `
import pandas as pd

pd.read_csv(${selectedValue})`;
      } else {
        return `
import pandas as pd

csvId = getCsvById(${selectedKey})
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
    const updatedCsvResponse = [...csvResponse, ...newOptions];

    setCsvResponse(updatedCsvResponse);

    Blockly.Blocks["read_csv"].generateOptions = function () {
      return updatedCsvResponse;
    };

    // Actualizar los bloques en el workspace
    workspace = Blockly.getMainWorkspace();
    const blocksXML = Blockly.Xml.workspaceToDom(workspace);
    workspace.clear();
    Blockly.Xml.domToWorkspace(blocksXML, workspace);
  };

  return (
    <div style={{ width: "50%" }}>
      <CsvUploader updateDropdownOptions={updateDropdownOptions} />

      <div id="blocklyDiv" style={{ flex: 1, height: "680px" }}></div>
    </div>
  );
};

export default BlocksEditor;
