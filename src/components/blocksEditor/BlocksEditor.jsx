import React, { useEffect, useState } from "react";
import CsvUploader from "../csvUploader/CsvUploader";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { toolbox } from "./constants/toolbox";

const BlocksEditor = ({ updateCode }) => {
  const [csvResponse, setCsvResponse] = useState([["Alumnos", "1"]]);
  var workspace;
  var useFront;

  useEffect(() => {
    Blockly.Blocks["print_with_argument"] = {
      init: function () {
        this.appendDummyInput().appendField("print(");
        this.appendValueInput("ARGUMENT").setCheck(null); // Acepta cualquier tipo de bloque como argumento
        this.appendDummyInput().appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    pythonGenerator.forBlock["print_with_argument"] = function (block) {
      var value_argument = pythonGenerator.valueToCode(
        block,
        "ARGUMENT",
        pythonGenerator.ORDER_NONE
      );
      // Generar código para la función print() con el argumento proporcionado
      var code = "print(" + value_argument + ")\n";
      return code;
    };

    Blockly.Blocks["read_csv"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("csvs")
          .appendField(
            new Blockly.FieldDropdown(this.generateOptions),
            "csvOptions"
          );
        this.setOutput(true, null); // Permite que este bloque pueda ser conectado a otro bloque
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
        const code = `pd.read_csv(${selectedValue})`;
        return [code, pythonGenerator.ORDER_FUNCTION_CALL];
      } else {
        //from app.services.csv_service import read_csv
        const code = `read_csv(${selectedKey})`;
        return [code, pythonGenerator.ORDER_FUNCTION_CALL];
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
