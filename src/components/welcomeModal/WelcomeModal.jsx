import React from "react";
import "./styles.css";
import { welcomeModalInfo } from "./welcomeModalInfo";

const WelcomeModal = ({ handleCloseInitialAlert }) => {
  return (
    <>
      <div
        className="modal show mobile-tutorial"
        tabIndex="-1"
        style={{ display: "block" }}
      >
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
                A continuación, un pequeño tutorial sobre algunos usos de la
                aplicación. Presione{" "}
                <span style={{ fontWeight: "600" }}>Omitir tutorial</span> si lo
                desea.
              </p>
              <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide"
              >
                <div className="carousel-indicators">
                  {welcomeModalInfo.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to={index}
                      className={index === 0 && "active"}
                      aria-current={index === 0 && "true"}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {welcomeModalInfo.map((item, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 && "active"}`}
                    >
                      <img
                        src={item.image}
                        className="d-block w-100"
                        alt={`Slide ${index + 1}`}
                      />
                      <div
                        style={{ color: "black" }}
                        className="carousel-caption d-none d-md-block"
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.description.replace(
                              /(read_csv)/g,
                              "<strong>$1</strong>"
                            ),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={handleCloseInitialAlert}
                className="btn btn-primary"
              >
                Omitir tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeModal;
