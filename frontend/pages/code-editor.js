import CodeEditorContainer from "@/components/CodeEditor/code-editor-container/CodeEditorContainer";
import FileViewer from "@/components/CodeEditor/file-viewer/FileViewer";
import Layout from "@/components/common/layout/Layout";
import styled from "@emotion/styled";
import React from "react";

const CodeEditorDiv = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.background,
}));

const FileViewerContainer = styled("div")({
  display: "flex",
  flex: 1,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "300px",
  overflow: "auto",
  borderRight: "1px dashed black",
});

const CodeEditorContainerDiv = styled("div")({
  flex: 3,
  height: "100%",
});

function CodeEditor() {
  return (
    <Layout title="Code Editor">
      <CodeEditorDiv>
        <FileViewerContainer>
          <FileViewer />
        </FileViewerContainer>
        <CodeEditorContainerDiv>
          <CodeEditorContainer />
        </CodeEditorContainerDiv>
      </CodeEditorDiv>
    </Layout>
  );
}

export default CodeEditor;
