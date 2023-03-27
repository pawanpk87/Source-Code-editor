import ExtensionIcon from "../extension-icon/ExtensionIcon";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { closeFile } from "@/src/app/store/thunks/closeFile";
import { useDispatch, useSelector } from "react-redux";
import { selectFilesState } from "@/src/app/store/slices/filesSlice";

function CustomTabLabel(props) {
  const filesState = useSelector(selectFilesState);
  const dispatch = useDispatch();
  const { activeFile } = props;

  const onClose = (even) => {
    even.stopPropagation();
    dispatch(closeFile(activeFile.id, filesState));
  };

  return (
    <CustomTabLabelContainer>
      <ExtensionIcon extension={activeFile.extension} />
      <FileName>{activeFile.name}</FileName>
      <CloseIcon
        onClick={onClose}
        sx={{
          position: "absolute",
          right: "0",
          color: (theme) => theme.font,
        }}
      />
    </CustomTabLabelContainer>
  );
}

const CustomTabLabelContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
});

const FileName = styled("div")(({ theme }) => ({
  padding: "0px 5px",
}));

export default CustomTabLabel;
