import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const CodeEditor = ({ code }) => {
  return (
    <>
      <CodeMirror
        value={code}
        height="200px"
        theme="light"
        readOnly={true}
        extensions={[python({ jsx: true })]}
      />
    </>
  );
};

export default CodeEditor;
