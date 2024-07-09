import React from "react";
import "../styles.css";

const ErrorAlert = ({ errorAlertText }) => {
  return (
    <div className="alert alert-danger content mobile-content" role="alert">
      {errorAlertText}
    </div>
  );
};

export default ErrorAlert;
