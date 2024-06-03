import React from "react";
import Blockly from "blockly";

const WorkspaceJsonUploader = () => {
  const clearWorkspace = () => {
    Blockly.getMainWorkspace().clear();
  };

  const exportWorkspaceToJson = () => {
    const state = Blockly.serialization.workspaces.save(
      Blockly.getMainWorkspace()
    );
    const jsonString = JSON.stringify(state);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "workspace.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button className="btn btn-danger" type="button" onClick={clearWorkspace}>
        Eliminar bloques
      </button>
      {/*<button
        className="btn btn-primary"
        type="button"
        onClick={exportWorkspaceToJson}
      >
        Exportar Workspace
  </button>*/}
    </>
  );
};

export default WorkspaceJsonUploader;
