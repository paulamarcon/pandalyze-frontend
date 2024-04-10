import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initReadCsvBlock = (useFrontRef) => {
  Blockly.Blocks["read_csv"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("csvs")
        .appendField(
          new Blockly.FieldDropdown(this.generateOptions),
          "csvOptions"
        );
      this.setOutput(true, null); // Permite que este bloque pueda ser conectado a otro bloque
    },

    generateOptions: function () {
      return [["Alumnos", "1"]];
    },
  };

  pythonGenerator.forBlock["read_csv"] = function (block, generator) {
    var selectedKey = block.getFieldValue("csvOptions");
    var selectedValue = block.getField("csvOptions").getText();

    if (useFrontRef.current) {
      const code = `pd.read_csv(${selectedValue})`;
      return [code, pythonGenerator.ORDER_FUNCTION_CALL];
    } else {
      //from app.services.csv_service import read_csv
      const code = `read_csv(${selectedKey})`;
      return [code, pythonGenerator.ORDER_FUNCTION_CALL];
    }
  };
};
