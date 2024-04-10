import { initPrintBlock } from "../constants/blocks/printBlock";
import { initReadCsvBlock } from "../constants/blocks/readCsvBlock";

const BlocksService = {
  initBlocks(useFrontRef) {
    initPrintBlock();
    initReadCsvBlock(useFrontRef);
  },
};
export default BlocksService;
