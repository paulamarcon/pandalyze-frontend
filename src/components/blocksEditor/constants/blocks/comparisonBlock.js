import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initComparisonBlock = () => {
  Blockly.Blocks["comparison"] = {
    init: function () {
      this.appendValueInput("dataFrameValue").setCheck(null);
      this.appendDummyInput().appendField("[");
      this.appendValueInput("columnNameValue").setCheck(null);
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ["==", "EQUAL"],
          [">", "GREATER_THAN"],
          ["<", "LESS_THAN"],
          [">=", "GREATER_THAN_OR_EQUAL"],
          ["<=", "LESS_THAN_OR_EQUAL"],
          ["!=", "NOT_EQUAL"],
        ]),
        "OPERATOR"
      );
      this.appendDummyInput().appendField(
        new Blockly.FieldTextInput("0"), // Default value es ""
        "rightValue"
      );
      this.appendDummyInput().appendField("]");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(210);
      this.setTooltip("Realiza una comparación entre dos valores.");
    },
  };

  pythonGenerator["comparison"] = function (block) {
    var dataFrameValue = pythonGenerator.valueToCode(
      block,
      "dataFrameValue",
      pythonGenerator.ORDER_NONE
    );
    var columnNameValue =
      pythonGenerator.valueToCode(
        block,
        "columnNameValue",
        pythonGenerator.ORDER_NONE
      ) || 0;

    var operator = block.getField("OPERATOR").getText();
    var rightValue = block.getFieldValue("rightValue");

    var comparisonCode = `${dataFrameValue}[${columnNameValue} ${operator} ${rightValue}]`;

    return [comparisonCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
