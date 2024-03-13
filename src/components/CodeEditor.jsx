import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const CodeEditor = ({ frontendCode }) => {
  return (
    <>
      <CodeMirror
        value={frontendCode}
        height="200px"
        theme="light"
        readOnly={true}
        extensions={[python({ jsx: true })]}
      />
    </>
  );
};

export default CodeEditor;
