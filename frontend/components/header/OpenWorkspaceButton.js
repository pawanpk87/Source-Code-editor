import { readFiles } from "@/src/app/store/thunks/readFiles";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useRef } from "react";
import { useDispatch } from "react-redux";

const OpenWorkspaceStyledButton = styled(Button)(({ theme }) => ({
  color: theme.commonColors.white,
}));

const InputFile = styled("input")({
  display: "none",
});

function OpenWorkspaceButton() {
  const dispatch = useDispatch();

  const directoryInputRef = useRef(null);
  const onClick = () => {
    directoryInputRef.current.click();
  };

  const onFilesUploaded = async () => {
    try {
      const files = directoryInputRef.current.files;
      await dispatch(readFiles(files));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <OpenWorkspaceStyledButton onClick={onClick}>
        Open Workspace
      </OpenWorkspaceStyledButton>
      <input
        directory=""
        webkitdirectory=""
        type="file"
        ref={directoryInputRef}
        onChange={onFilesUploaded}
        className="hidden"
      />
    </div>
  );
}

export default OpenWorkspaceButton;
