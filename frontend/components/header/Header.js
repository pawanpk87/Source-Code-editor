import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import CodeEditorButton from "./CodeEditorButton";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { selectUser } from "@/src/app/store/slices/userSlice";
import DarkModeSwitch from "./DarkModeSwitch";
import { useRouter } from "next/router";
import OpenWorkspaceButton from "./OpenWorkspaceButton";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.commonColors.white,
}));

function Header() {
  const user = useSelector(selectUser);
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }}>
          <StyledLink href="/">Code Editor App</StyledLink>
        </Typography>
        <DarkModeSwitch />
        {user ? <AuthenticatedButtons /> : <UnauthenticatedButtons />}
      </Toolbar>
    </AppBar>
  );
}

const UnauthenticatedButtons = () => {
  return (
    <div>
      <SignInButton />
    </div>
  );
};

const AuthenticatedButtonsContainer = styled("div")({ display: "flex" });

const AuthenticatedButtons = () => {
  const router = useRouter();
  return (
    <AuthenticatedButtonsContainer>
      {router.pathname === "/" ? <CodeEditorButton /> : <OpenWorkspaceButton />}
      <SignOutButton />
    </AuthenticatedButtonsContainer>
  );
};

export default Header;
