import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import CodeEditorButton from "./CodeEditorButton";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { selectUser } from "@/src/app/store/slices/userSlice";

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

const AuthenticatedButtons = () => {
  return (
    <div>
      <CodeEditorButton />
      <SignOutButton />
    </div>
  );
};

export default Header;
