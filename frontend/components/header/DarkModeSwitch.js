import {
  selectDarkMode,
  toggleDarkMode,
} from "@/src/app/store/slices/darkModeSlice";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function DarkModeSwitch() {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const onChangeDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <Switch color="default" checked={darkMode} onChange={onChangeDarkMode} />
    </>
  );
}

export default DarkModeSwitch;
