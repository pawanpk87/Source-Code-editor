import { setUser } from "@/src/app/store/slices/userSlice";
import { Button, styled } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";

const SignOutStyledButton = styled(Button)(({ theme }) => ({
  color: theme.commonColors.white,
}));

function SignOutButton() {
  const dispatch = useDispatch();

  const onSignOut = () => {
    const onSignOutUser = async () => {
      try {
        const response = await axios.get("api/user/logout", {
          withCredentials: true,
        });
        dispatch(setUser(null));
      } catch (error) {
        dispatch(setUser(null));
        //do nothing
      }
    };
    onSignOutUser();
  };

  return (
    <SignOutStyledButton onClick={onSignOut}>Sign Out</SignOutStyledButton>
  );
}

export default SignOutButton;
