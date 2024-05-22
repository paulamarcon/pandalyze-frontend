import React from "react";
import "./styles.css";

const WelcomeModal = ({ handleCloseInitialAlert }) => {
  return (
    <>
      <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">¡Bienvenidos a Pandalyze!</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseInitialAlert}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                En la sección de la izquierda se encuentran los distintos
                bloques a utilizar y en la derecha su traducción a código
                Python.
              </p>
              <p>Si presionan 'Ejecutar código' verán resultados en consola.</p>
              <h6>¡Empecemos!</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeModal;
