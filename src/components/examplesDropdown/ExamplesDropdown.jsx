import React, { useEffect, useState } from "react";
import examplesData from "./examples.json";
import Blockly from "blockly";

const ExamplesDropdown = () => {
  const [examples, setExamples] = useState(examplesData);

  useEffect(() => {}, []);

  const handleDropdownItemClick = (exampleTitle) => {
    const selectedExample = examples.find(
      (example) => example.title === exampleTitle
    );

    loadExampleBlocksIntoWorkspace(selectedExample);
  };

  const loadExampleBlocksIntoWorkspace = (selectedExample) => {
    if (selectedExample) {
      Blockly.serialization.workspaces.load(
        selectedExample.blocks,
        Blockly.getMainWorkspace()
      );
    }
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Ejemplos
      </button>
      <ul className="dropdown-menu">
        {examples.map((example) => (
          <li key={example.title}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => handleDropdownItemClick(example.title)}
            >
              {example.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamplesDropdown;
