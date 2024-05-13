import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initPieBlock = () => {
  Blockly.Blocks["pie"] = {
    init: function () {
      this.appendDummyInput().appendField("plotly.pie(data_frame = ");
      this.appendValueInput("dataFrameValue").setCheck(null);
      this.appendDummyInput().appendField(", values = ");
      this.appendValueInput("xValue").setCheck(null);
      this.appendDummyInput().appendField(", names = ");
      this.appendValueInput("yValue").setCheck(null);

      this.appendDummyInput().appendField(")");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(80);
      this.setTooltip(
        "Muestra un gráfico de torta a partir de columnas de un DataFrame. En 'values' va la columna numérica y en 'names' la columna de strings o ambas numéricas"
      );
      this.setHelpUrl("");
    },
  };

  pythonGenerator["pie"] = function (block) {
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
    var pieCode = `plotly.pie(data_frame = ${dataFrameBlockInput}, values = ${xBlockInput}, names = ${yBlockInput})`;

    return [pieCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
