import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleRunCode = () => {
    // Placeholder for running code logic
    toast("Code executed successfully!");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl mb-4">Code Editor</h1>
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleEditorChange}
        theme="vs-dark"
      />
      <Button className="mt-4" onClick={handleRunCode}>
        Run Code
      </Button>
    </div>
  );
};

export default CodeEditor;