import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import "./OutputConsoleStyles.css";

const OutputConsole = ({ backendResponse }) => {
  useEffect(() => {
    if (backendResponse.output || backendResponse.plots) {
      document
        .querySelector(".console")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [backendResponse]);

  //TODO: Refactor esta cochinada
  return (
    <div className="consoles-container">
      {/* Mostrar consola de error si hay error */}
      {backendResponse.codeExecutionError && (
        <div className="console console-error">
          <pre className="code-output">{backendResponse.personalizedError}</pre>
          {backendResponse.originalError && (
            <details>
              <summary>Ver información avanzada</summary>
              <pre className="code-output">{backendResponse.originalError}</pre>
            </details>
          )}
        </div>
      )}

      {/* Mostrar una sola consola si hay solo texto */}
      {backendResponse.output && !backendResponse.plots?.length && (
        <div
          className={`console ${
            backendResponse.codeEmptyWarning ? "console-warning" : ""
          }`}
        >
          <pre className="code-output">{backendResponse.output}</pre>
        </div>
      )}

      {/* Mostrar una sola consola si hay solo imágenes */}
      {!backendResponse.output && backendResponse.plots?.length > 0 && (
        <div className="console">
          {backendResponse.plots.map((plot, index) => (
            <Plot key={index} data={plot.data} layout={plot.layout} />
          ))}
        </div>
      )}

      {/* Mostrar ambas consolas si hay tanto texto como imágenes */}
      {backendResponse.output && backendResponse.plots?.length > 0 && (
        <>
          <div className="console">
            <pre className="code-output">{backendResponse.output}</pre>
          </div>

          <div className="console">
            {backendResponse.plots.map((plot, index) => (
              <Plot key={index} data={plot.data} layout={plot.layout} />
            ))}
          </div>
        </>
      )}

      {/* Mostrar mensaje si no hay ni texto ni imágenes */}
      {!backendResponse.output &&
        !backendResponse.plots?.length &&
        !backendResponse.codeExecutionError && (
          <div className="console">
            <h5>Consola</h5>
          </div>
        )}
    </div>
  );
};

export default OutputConsole;
