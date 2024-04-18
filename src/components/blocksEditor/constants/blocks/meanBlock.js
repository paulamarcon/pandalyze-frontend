import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initMeanBlock = () => {
  Blockly.Blocks["mean"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".mean(");
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldTextInput("", this.validateInput),
          "COLUMN_NAME"
        )
        .appendField(")");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(0);
      this.setTooltip("Calcula promedios de filas o columnas del DataFrame.");
    },
  };

  pythonGenerator["mean"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var columnName = block.getFieldValue("COLUMN_NAME");
    var meanCode = blockInput
      ? columnName
        ? `${blockInput}.mean(${columnName})`
        : `${blockInput}.mean()`
      : columnName
      ? `.mean(${columnName})`
      : ".mean()";
    return [meanCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
