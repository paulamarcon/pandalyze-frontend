import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initPropertyBlock = (csvsData, variables) => {
  Blockly.Blocks["property"] = {
    init: function () {
      this.appendValueInput("blockInput").setCheck(null);
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([["Columna", "Columna"]]),
        "dropdown"
      );
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(280);
      this.setTooltip("Permite acceder a las propiedades de una variable.");
      this.setHelpUrl("");
    },
    /*Puede servir?
      onchange: function (event) {
      console.log(event.type);
    },*/
  };

  pythonGenerator["property"] = function (block) {
    const blockInput = this.getInputTargetBlock("blockInput");

    const blockInputVariableName = blockInput
      ?.getField("variableGetterKey")
      ?.getText();
    const csvId = blockInput?.getFieldValue("csvOptions");

    //Valor default para el dropdown si no tiene un input block
    if (!blockInput) {
      const dropdownField = block.getField("dropdown");
      dropdownField.menuGenerator_ = [["Columna", "Columna"]];
      dropdownField.setValue("Columna");
    }

    if (csvId) {
      const blockInputCsvColumnsNames = csvsData
        .find((csvData) => csvData.id.toString() === csvId)
        .columnsNames?.map((columnName) => [columnName, columnName]);

      const currentOptions = this.getField("dropdown").getOptions();

      // Si cambiaron las opciones del dropdown actualizo el workspace
      const optionsChanged =
        JSON.stringify(blockInputCsvColumnsNames) !==
        JSON.stringify(currentOptions);
      if (optionsChanged) {
        const dropdownField = block.getField("dropdown");
        dropdownField.menuGenerator_ = blockInputCsvColumnsNames;
        dropdownField.setValue(blockInputCsvColumnsNames[0][1]); //default: 1er columna humanReadable
      }
    }

    //TODO: Falta soporte para bloque de variable

    var blockInputCode = pythonGenerator.valueToCode(
      block,
      "blockInput",
      pythonGenerator.ORDER_NONE
    );
    var dropdownInput = block.getFieldValue("dropdown");
    var propertyCode = `${blockInputCode}.${dropdownInput}`;

    return [propertyCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
