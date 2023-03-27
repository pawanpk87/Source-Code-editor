import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    userFiles: [],
    activeFilesIds: [],
    editorActiveField: null,
  },
  reducers: {
    setFiles: (state, action) => {
      state.userFiles = action.payload;
      state.activeFilesIds = [];
    },
    addActiveFile: (state, action) => {
      state.activeFilesIds.push(action.payload);
    },
    removeActiveFile: (state, action) => {
      state.activeFilesIds = state.activeFilesIds.filter(
        (fileId) => fileId !== action.payload
      );
    },
    setEditorActiveFile: (state, action) => {
      state.editorActiveField = action.payload;
    },
    updateFileCode: (state, action) => {
      const { fileId, newCode } = action.payload;
      const { userFiles } = state;
      let userFileToUpdate = userFiles.find((file) => file.id === fileId);
      if (userFileToUpdate) {
        userFileToUpdate.code = newCode;
      }
    },
  },
});

export const {
  setFiles,
  addActiveFile,
  removeActiveFile,
  setEditorActiveFile,
  updateFileCode,
} = filesSlice.actions;

export const selectFilesState = (state) => state.files;
export const selectActiveFiles = (state) => state.files.activeFilesIds;
export const selectEditorActiveFileId = (state) =>
  state.files.editorActiveField;
export default filesSlice.reducer;
