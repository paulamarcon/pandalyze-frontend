import React, { useEffect, useState } from "react";
import CsvUploader from "../csvUploader/CsvUploader";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { toolbox } from "./constants";

const BlocksEditor = ({ useFront, updateCode }) => {
  const [csvResponse, setCsvResponse] = useState({ csvName: "", csvId: "" });
  var workspace;

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

    updateCsvBlockCode();

    workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
    });

    workspace.addChangeListener(updateCode);
  }, []);

  const updateCsvBlockCode = () => {
    pythonGenerator.forBlock["read_csv"] = function (block, generator) {
      const { csvName, csvId } = csvResponse;
      console.log("generando codigo, usefront = ", useFront);
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
  };

  const updateDropdownOptions = (newOptions) => {
    Blockly.Blocks["read_csv"].generateOptions = function () {
      return newOptions;
    };

    updateCsvBlockCode();

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
        updateCsvBlockCode={updateCsvBlockCode}
        updateDropdownOptions={updateDropdownOptions}
      />

      <div id="blocklyDiv" style={{ flex: 1, height: "680px" }}></div>
    </>
  );
};

export default BlocksEditor;
