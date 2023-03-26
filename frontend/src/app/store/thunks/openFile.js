import { addActiveFile, setEditorActiveFile } from "../slices/filesSlice";

export const openFile = (TreeViewNode) => (dispatch, filesState) => {
  const { id, children } = TreeViewNode;
  if (children) {
    return;
  }
  const { activeFilesIds } = filesState;

  if (!activeFilesIds.includes(id)) {
    dispatch(addActiveFile(id));
  }

  dispatch(setEditorActiveFile(id));
};
