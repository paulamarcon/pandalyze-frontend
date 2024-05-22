import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initPropertyBlock = (csvsData) => {
  Blockly.Blocks["property"] = {
    init: function () {
      this.appendDummyInput().appendField("data_frame =");
      this.appendValueInput("blockInput").setCheck(null);
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([["Columna", "Columna"]]),
        "dropdown"
      );
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(10);
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

    let csvId;
    const variableName = blockInput?.getField("variableGetterKey")?.getText();
    const csvOption = blockInput?.getFieldValue("csvOptions");

    //Si es un bloque read_csv o si es un bloque variables_get con un csv seteado, recupero el csvId
    if (csvOption) {
      csvId = csvOption;
    } else if (variableName) {
      const setterBlock = findSetterBlock(variableName);
      csvId = setterBlock
        ?.getInputTargetBlock("VALUE")
        ?.getFieldValue("csvOptions");
    }

    if (csvId) {
      const blockInputCsvColumnsNames = csvsData
        .find((csvData) => csvData.id.toString() === csvId)
        .columnsNames?.map((columnName) => [columnName, columnName]);

      const currentOptions = this.getField("dropdown").getOptions();

      // Si cambiaron las opciones del dropdown, lo actualizo
      const optionsChanged =
        JSON.stringify(blockInputCsvColumnsNames) !==
        JSON.stringify(currentOptions);
      if (optionsChanged) {
        const dropdownField = block.getField("dropdown");
        dropdownField.menuGenerator_ = blockInputCsvColumnsNames;
        dropdownField.setValue(blockInputCsvColumnsNames[0][1]); //default: 1er columna humanReadable
      }
    } else {
      //Default si no ingresa bloque, o si el bloque no es de tipo dataframe
      const dropdownField = block.getField("dropdown");
      dropdownField.menuGenerator_ = [["Columna", "Columna"]];
      dropdownField.setValue("Columna");
    }

    var blockInputCode = pythonGenerator.valueToCode(
      block,
      "blockInput",
      pythonGenerator.ORDER_NONE
    );
    var dropdownInput = block.getFieldValue("dropdown");
    var propertyCode = `${blockInputCode}.${dropdownInput}`;

    return [propertyCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };

  //Encuentra el bloque "variables_set" que setea a la variable variableName
  function findSetterBlock(variableName) {
    return Blockly.getMainWorkspace()
      .getAllBlocks()
      .find((block) => {
        return block.getField("variableSetterKey")?.getText() === variableName;
      });
  }
};
