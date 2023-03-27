import { useCallback, useState } from "react";
import Editor from "@monaco-editor/react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode } from "@/src/app/store/slices/darkModeSlice";
import { updateFileCode } from "@/src/app/store/slices/filesSlice";
import Loading from "@/components/common/loading/Loading";

const supportedExtensions = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  rb: "ruby",
  java: "java",
  go: "go",
  html: "html",
  php: "php",
  css: "css",
  json: "json",
};

function CustomEditor(props) {
  const { activeFile } = props;
  const [code, setCode] = useState(activeFile.code);
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const language = supportedExtensions[activeFile.extension];

  const debouncedSave = useCallback(
    debounce((fileId, newCode) => {
      dispatch(
        updateFileCode({
          fileId,
          newCode,
        })
      );
    }, 1000),
    []
  );

  const onChange = (newCode = "") => {
    setCode(newCode);
    debouncedSave(activeFile.id, newCode);
  };

  return (
    <Editor
      width="100%"
      height="100%"
      language={language}
      theme={darkMode ? "vs-dark" : "light"}
      value={code}
      loading={<Loading />}
      onChange={onChange}
    />
  );
}

export default CustomEditor;
