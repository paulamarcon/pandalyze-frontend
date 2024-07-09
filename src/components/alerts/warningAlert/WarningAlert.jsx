import React from "react";
import "../styles.css";

const WarningAlert = ({ warningAlertText }) => {
  return (
    <div className="alert alert-warning content mobile-content" role="alert">
      {warningAlertText}
    </div>
  );
};

export default WarningAlert;
