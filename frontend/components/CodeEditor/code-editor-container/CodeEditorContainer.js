import selectActiveFiles from "@/src/app/store/selectors/selectActiveFiles";
import {
  selectEditorActiveFileId,
  setEditorActiveFile,
} from "@/src/app/store/slices/filesSlice";
import styled from "@emotion/styled";
import { AppBar, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomTabLabel from "../custom-tab-label/CustomTabLabel";
import CustomTabPanel from "../custom-tab-panel/CustomTabPanel";

function CodeEditorContainer() {
  const dispatch = useDispatch();
  const activeFiles = useSelector(selectActiveFiles);
  const editorActiveField = useSelector(selectEditorActiveFileId);

  const tabValue = editorActiveField
    ? activeFiles.findIndex((activeFile) => activeFile.id === editorActiveField)
    : 0;

  const onTabClick = (event, tabPosition) => {
    const activeFile = activeFiles[tabPosition];
    if (activeFile.id !== editorActiveField) {
      dispatch(setEditorActiveFile(activeFile.id));
    }
  };

  if (!activeFiles.length) {
    return <EmptyMessage>Select a File</EmptyMessage>;
  }

  return (
    <CodeEditorContainerDiv>
      <AppBar position="static" color="default">
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          value={tabValue}
          onChange={onTabClick}
        >
          {activeFiles.map((activeFile) => {
            const { id } = activeFile;
            return (
              <Tab
                key={id}
                label={<CustomTabLabel activeFile={activeFile} />}
              />
            );
          })}
        </Tabs>
      </AppBar>
      {activeFiles.map((activeFile) => {
        const { id } = activeFile;
        return (
          <CustomTabPanel
            key={id}
            activeFile={activeFile}
            editorActiveField={editorActiveField}
          />
        );
      })}
    </CodeEditorContainerDiv>
  );
}

const CodeEditorContainerDiv = styled("div")({
  flex: 1,
  height: "100%",
  overflow: "hidden",
});

const EmptyMessage = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  color: theme.font,
}));

export default CodeEditorContainer;
