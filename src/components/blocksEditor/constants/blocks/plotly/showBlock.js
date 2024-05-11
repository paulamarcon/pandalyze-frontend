import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initShowBlock = () => {
  Blockly.Blocks["show"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".show()");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#DE2F87");
      this.setTooltip(
        "Muestra el gráfico formado con Plotly: barras, puntos, líneas o de torta. Abre una página a parte para mostrarlo."
      );
      this.setHelpUrl("");
    },
  };

  pythonGenerator["show"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var showCode = `${blockInput}.show()\n`;

    return showCode;
  };
};
