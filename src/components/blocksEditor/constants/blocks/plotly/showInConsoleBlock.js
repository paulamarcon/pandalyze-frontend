import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initShowInConsoleBlock = (useFrontRef) => {
  Blockly.Blocks["showInConsole"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".showInConsole()");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#DE2F87");
      this.setTooltip(
        "Muestra el gráfico formado con Plotly en consola: barras, puntos, líneas o de torta."
      );
      this.setHelpUrl("");
    },
  };

  pythonGenerator["showInConsole"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );

    /* TODO:
        Si lanza error en el back, al usuario le va a devolver que pincho en el append y no va a entender nada.
        Lo que se puede hacer es chequear que blockInput sea uno de los de plotly, asi tamos un toque mas seguros
            que no va a pinchar
    */
    return useFrontRef.current || !blockInput
      ? `${blockInput}.show()\n`
      : `jsonPlots.append(pio.to_json(${blockInput}, pretty=True))`;
  };
};
