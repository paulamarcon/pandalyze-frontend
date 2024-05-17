const BlockInfoModal = ({ blockType, blockInfo, mouseClickPosition }) => {
  const thoughtBubbleStyle = {
    position: "absolute",
    top: mouseClickPosition.y - 150,
    left: mouseClickPosition.x - 100,
    background: "#17a2b8",
    borderRadius: "15px",
    padding: "20px",
    color: "white",
    width: "200px",
    zIndex: 9999,
  };

  const beforeAfterStyle = {
    content: '""',
    position: "absolute",
    background: "#17a2b8",
    borderRadius: "50%",
  };

  const beforeStyle = {
    ...beforeAfterStyle,
    width: "20px",
    height: "20px",
    bottom: "-10px",
    left: "20px",
  };

  const afterStyle = {
    ...beforeAfterStyle,
    width: "12px",
    height: "12px",
    bottom: "-25px",
    left: "40px",
  };

  return (
    <div style={thoughtBubbleStyle}>
      <h5>{blockType}</h5>
      <p>{blockInfo}</p>
      <div style={beforeStyle}></div>
      <div style={afterStyle}></div>
    </div>
  );
};

export default BlockInfoModal;
