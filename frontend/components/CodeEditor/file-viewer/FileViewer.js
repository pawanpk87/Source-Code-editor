import styled from "@emotion/styled";
import { TreeItem, TreeView } from "@mui/lab";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderIcon from "@mui/icons-material/Folder";
import selectTreeViewData from "@/src/app/store/selectors/selectTreeViewData";
import ExtensionIcon from "../extension-icon/ExtensionIcon";
import { openFile } from "@/src/app/store/thunks/openFile";
import { useDispatch, useSelector } from "react-redux";
import { selectFilesState } from "@/src/app/store/slices/filesSlice";

const EmptyMessage = styled("div")(({ theme }) => ({
  color: theme.font,
}));

function FileViewer() {
  const filesState = useSelector(selectFilesState);
  const fileViewerData = useSelector(selectTreeViewData);
  const dispatch = useDispatch();

  const onSelectNode = (TreeViewNode) => {
    dispatch(openFile(TreeViewNode, filesState));
  };

  const renderTree = (TreeViewNode) => {
    const { id, name, extension } = TreeViewNode;
    return (
      <TreeItem
        key={id}
        nodeId={id}
        label={name}
        onDoubleClick={() => onSelectNode(TreeViewNode)}
        endIcon={<ExtensionIcon extension={extension} />}
        sx={{
          padding: "2px",
          color: (theme) => theme.font,
        }}
      >
        {Array.isArray(TreeViewNode.children)
          ? TreeViewNode.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  if (!Object.keys(fileViewerData).length) {
    return <EmptyMessage>No Files</EmptyMessage>;
  }

  return (
    <TreeView
      sx={{ padding: "0px 10px 10px", height: "100%", width: "100%" }}
      defaultCollapseIcon={<FolderOpenIcon />}
      defaultExpandIcon={<FolderIcon />}
    >
      {renderTree(fileViewerData)}
    </TreeView>
  );
}

export default FileViewer;
