import { Button, styled } from "@mui/material";
import { useState } from "react";
import SignIn from "../DialogBox/signin/SignIn";

const SignInStyledButton = styled(Button)(({ theme }) => ({
  color: theme.commonColors.white,
}));

function SignInButton() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <SignInStyledButton onClick={() => setToggle(!toggle)}>
        Sign In
      </SignInStyledButton>
      <SignIn
        toggleSignInDialogBox={toggle}
        setToggleSignInDialogBox={setToggle}
      />
    </>
  );
}

export default SignInButton;
