import { readFile } from "@/util/readFile";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFiles } from "../slices/filesSlice";

export const readFiles = createAsyncThunk(
  "files/readFiles",
  async (files, { dispatch }) => {
    let promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      promises.push(readFile(file));
    }
    const userFiles = await Promise.all(promises);
    console.log("final userFiles is:-");
    console.log(userFiles);
    dispatch(setFiles(userFiles));
  }
);
