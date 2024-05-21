import "./styles.css";

const BlockInfoModal = ({ blockTitle, blockInfo, mouseClickPosition }) => {
  const dynamicStyle = {
    top: mouseClickPosition.y - 35,
    left: mouseClickPosition.x - 80,
  };

  return (
    <div className="thoughtBubbleStyle" style={dynamicStyle}>
      <h5>{blockTitle}</h5>
      <hr />
      <p>{blockInfo}</p>
      <div className="beforeStyle beforeAfterStyle"></div>
      <div className="afterStyle beforeAfterStyle"></div>
    </div>
  );
};

export default BlockInfoModal;
