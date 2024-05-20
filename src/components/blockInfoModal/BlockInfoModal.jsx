import "./styles.css";

const BlockInfoModal = ({ blockType, blockInfo, mouseClickPosition }) => {
  const dynamicStyle = {
    top: mouseClickPosition.y - 150,
    left: mouseClickPosition.x - 100,
  };

  return (
    <div className="thoughtBubbleStyle" style={dynamicStyle}>
      <h5>{blockType}</h5>
      <p>{blockInfo}</p>
      <div className="beforeStyle beforeAfterStyle"></div>
      <div className="afterStyle beforeAfterStyle"></div>
    </div>
  );
};

export default BlockInfoModal;
