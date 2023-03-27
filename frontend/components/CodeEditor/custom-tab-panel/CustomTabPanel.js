import styled from "@emotion/styled";
import CustomEditor from "../custom-editor/CustomEditor";

function CustomTabPanel(props) {
  const { activeFile, editorActiveField } = props;

  return (
    <CustomTabPanelContainer
      role="tabpanel"
      hidden={editorActiveField !== activeFile.id}
    >
      <CustomEditor activeFile={activeFile} />
    </CustomTabPanelContainer>
  );
}

const CustomTabPanelContainer = styled("div")({ height: "100%" });
export default CustomTabPanel;
