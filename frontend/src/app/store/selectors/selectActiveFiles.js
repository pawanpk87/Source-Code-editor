import { createSelector } from "reselect";

const selectActiveFiles = (files) => {
  const { userFiles, activeFilesIds } = files;
  const userFilesMap = userFiles.reduce((result, activeFile) => {
    result[activeFile.id] = activeFile;
    return result;
  }, {});
  return activeFilesIds.map((activeFileId) => userFilesMap[activeFileId]);
};

export default createSelector((state) => state.files, selectActiveFiles);
