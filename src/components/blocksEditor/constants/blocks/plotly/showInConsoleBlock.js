import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initShowInConsoleBlock = (useFrontRef) => {
  Blockly.Blocks["showInConsole"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".show()");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("160");
      this.setHelpUrl("");
    },
  };

  pythonGenerator["showInConsole"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );

    return useFrontRef.current || !blockInput
      ? `${blockInput}.show()\n`
      : `_jsonPlots_.append(pio.to_json(${blockInput}, pretty=True))\n`;
  };
};
