import { removeActiveFile, setEditorActiveFile } from "../slices/filesSlice";

export const closeFile = (fileToCloseId, filesState) => (dispatch) => {
  const { activeFilesIds, editorActiveField } = filesState;
  const activeFilesLength = activeFilesIds.length;
  if (activeFilesLength === 1) {
    dispatch(setEditorActiveFile(null));
  } else if (activeFilesLength >= 2 && fileToCloseId === editorActiveField) {
    const newActiveFileId = getNewActiveFileId(
      activeFilesIds,
      activeFilesLength,
      fileToCloseId
    );
    dispatch(setEditorActiveFile(newActiveFileId));
  }
  dispatch(removeActiveFile(fileToCloseId));
};

const getNewActiveFileId = (
  activeFilesIds,
  activeFilesLength,
  fileToCloseId
) => {
  const fileToBeRemoveIndex = activeFilesIds.indexOf(fileToCloseId);
  //rightmost tab
  if (fileToBeRemoveIndex + 1 === activeFilesLength) {
    return activeFilesIds[fileToBeRemoveIndex - 1];
  }
  return activeFilesIds[fileToBeRemoveIndex + 1];
};
