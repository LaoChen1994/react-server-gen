// @monaco-editor/react is Monaco editor wrapper for easy/one-line integration with React
// applications without need of webpack (or other module bundler)
// configuration files.

import React, { useState } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";


export default function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("javascript");
  const [isEditorReady, setIsEditorReady] = useState(false);

  function handleEditorDidMount() {
    setIsEditorReady(true);
  }

  return (
    <>
      <Editor
        height="1000px" // By default, it fully fits with its parent
        theme={theme}
        language={language}
        value="const a = 1;"
        //@ts-ignore
        editorDidMount={handleEditorDidMount}
      />
    </>
  );
}
