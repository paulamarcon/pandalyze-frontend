import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initLineBlock = () => {
  Blockly.Blocks["line"] = {
    init: function () {
      this.appendDummyInput().appendField("plotly.line(data_frame = ");
      this.appendValueInput("dataFrameValue").setCheck(null);
      this.appendDummyInput().appendField(", x = ");
      this.appendValueInput("xValue").setCheck(null);
      this.appendDummyInput().appendField(", y = ");
      this.appendValueInput("yValue").setCheck(null);

      this.appendDummyInput().appendField(")");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(80);
      this.setTooltip(
        "Muestra un gráfico de lineas a partir de columnas x e y de un DataFrame."
      );
      this.setHelpUrl("");
    },
  };

  pythonGenerator["line"] = function (block) {
    var dataFrameBlockInput = pythonGenerator.valueToCode(
      block,
      "dataFrameValue",
      pythonGenerator.ORDER_NONE
    );
    var xBlockInput = pythonGenerator.valueToCode(
      block,
      "xValue",
      pythonGenerator.ORDER_NONE
    );
    var yBlockInput = pythonGenerator.valueToCode(
      block,
      "yValue",
      pythonGenerator.ORDER_NONE
    );
    var lineCode = `plotly.line(data_frame = ${dataFrameBlockInput}, x = ${xBlockInput}, y = ${yBlockInput})`;

    return [lineCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
