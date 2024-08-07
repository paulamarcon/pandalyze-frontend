import React from "react";
import "../styles.css";

const SuccessAlert = ({ successAlertText }) => {
  return (
    <div className="alert alert-success content mobile-content" role="alert">
      {successAlertText}
    </div>
  );
};

export default SuccessAlert;
