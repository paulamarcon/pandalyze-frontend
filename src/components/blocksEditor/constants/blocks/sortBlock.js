import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initSortBlock = () => {
  Blockly.Blocks["sort"] = {
    init: function () {
      this.appendDummyInput().appendField("data_frame =");
      this.appendValueInput("leftValue").setCheck(null);
      this.appendDummyInput().appendField(".sort_values(columna =");
      this.appendValueInput("rightValue").setCheck(null);
      this.appendDummyInput().appendField(", ascending =");
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ["True", "TRUE"],
          ["False", "FALSE"],
        ]),
        "BOOLEAN"
      );
      this.appendDummyInput().appendField(")");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#000000");
    },
  };

  pythonGenerator["sort"] = function (block) {
    var leftValue = pythonGenerator.valueToCode(
      block,
      "leftValue",
      pythonGenerator.ORDER_NONE
    );
    pythonGenerator.valueToCode(
      block,
      "rightValue",
      pythonGenerator.ORDER_NONE
    );
    const booleanValue = block.getField("BOOLEAN").getText();

    // Obtengo el nombre de la columna por la que se quiere ordenar.
    // primitiveColumnName es si se pone el primitivo y blockColumnName si se usa property
    // Primero verifico si setearon una variable o pusieron el bloque directamente dentro de bloque sort
    const variableName = this.getInputTargetBlock("rightValue")
      ?.getField("variableGetterKey")
      ?.getText();

    let primitiveColumnName, blockColumnName;

    if (variableName) {
      primitiveColumnName = findSetterBlock(variableName)?.childBlocks_?.filter(
        (childBlock) => childBlock.type === "primitive_text"
      )[0]?.inputList[0]?.fieldRow[1]?.value_;

      blockColumnName = findSetterBlock(variableName)?.childBlocks_?.filter(
        (childBlock) => childBlock.type === "property"
      )[0]?.inputList[2]?.fieldRow[0]?.value_;
    } else {
      primitiveColumnName = block?.childBlocks_?.filter(
        (childBlock) => childBlock.type === "primitive_text"
      )[0]?.inputList[0]?.fieldRow[1]?.value_;

      blockColumnName = block?.childBlocks_?.filter(
        (childBlock) => childBlock.type === "property"
      )[0]?.inputList[2]?.fieldRow[0]?.value_;
    }

    const sortCode = primitiveColumnName
      ? `${leftValue}.sort_values(by="${
          primitiveColumnName !== undefined ? primitiveColumnName : ""
        }", ascending=${booleanValue})`
      : `${leftValue}.sort_values(by="${
          blockColumnName !== undefined && blockColumnName !== "Columna"
            ? blockColumnName
            : ""
        }", ascending=${booleanValue})`;

    return [sortCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };

  function findSetterBlock(variableName) {
    return Blockly.getMainWorkspace()
      .getAllBlocks()
      .find((block) => {
        return block.getField("variableSetterKey")?.getText() === variableName;
      });
  }
};
