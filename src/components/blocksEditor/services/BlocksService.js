import { initHeadBlock } from "../constants/blocks/headBlock";
import { initInfoBlock } from "../constants/blocks/infoBlock";
import { initMeanBlock } from "../constants/blocks/meanBlock";
import { initPrintBlock } from "../constants/blocks/printBlock";
import { initReadCsvBlock } from "../constants/blocks/readCsvBlock";

const BlocksService = {
  initBlocks(useFrontRef) {
    initPrintBlock();
    initReadCsvBlock(useFrontRef);
    initHeadBlock();
    initInfoBlock();
    initMeanBlock();
  },
};
export default BlocksService;
