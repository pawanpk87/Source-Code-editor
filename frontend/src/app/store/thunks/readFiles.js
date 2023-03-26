import { readFile } from "@/util/readFile";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFiles } from "../slices/filesSlice";

export const Files = createAsyncThunk(
  "files/readFiles",
  async (files, { dispatch }) => {
    const promises = [];
    for (let i = 0; i < files.fileList; i++) {
      const file = files[i];
      promises.push(readFile(file));
    }
    const userFiles = await Promise.all(promises);
    dispatch(setFiles(userFiles));
  }
);
