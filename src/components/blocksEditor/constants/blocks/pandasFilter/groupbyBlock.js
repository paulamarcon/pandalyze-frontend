import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initGroupByBlock = () => {
  Blockly.Blocks["groupby"] = {
    init: function () {
      this.appendValueInput("DATAFRAME")
        .setCheck(null)
        .appendField("data_frame = ");
      this.appendValueInput("COLUMN").setCheck(null).appendField(".groupby(");
      this.appendDummyInput().appendField(")");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#5D4839");
      this.setHelpUrl("");
    },
  };

  pythonGenerator["groupby"] = function (block) {
    const dataframeInput = pythonGenerator.valueToCode(
      block,
      "DATAFRAME",
      pythonGenerator.ORDER_NONE
    );
    const columnInput = pythonGenerator.valueToCode(
      block,
      "COLUMN",
      pythonGenerator.ORDER_NONE
    );

    let groupbyCode = `${dataframeInput}.groupby(${columnInput})`;

    return [groupbyCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
