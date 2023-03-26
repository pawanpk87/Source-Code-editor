import { v4 as uuidv4 } from "uuid";

export const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      // name = index.js
      // webkitRelativePath = src/index.js
      const { name, webkitRelativePath } = file;
      const id = uuidv4();
      const code =
        reader.result !== null && reader.result !== undefined
          ? reader.result
          : "";
      const splitedName = name.split(".");
      const extension = splitedName[splitedName.length - 1];
      resolve({
        id,
        name,
        code,
        extension,
        relativePath: webkitRelativePath,
      });
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
};
