import Layout from "@/components/common/layout/Layout";
import ProgrammingLanguagesList from "@/components/home/programming-languages-list/ProgrammingLanguagesList";
import { selectUser } from "@/src/app/store/slices/userSlice";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const HomeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.background,
}));

const WelcomeMessage = styled("div")(({ theme }) => ({
  padding: "15px",
  fontSize: "30px",
  color: "black",
}));

export default function Home() {
  const user = useSelector(selectUser);
  return (
    <>
      <Layout title="Home">
        <HomeContainer>
          <WelcomeMessage>
            Welcome to the Code Editor App {user && user.firstName}
          </WelcomeMessage>
          <ProgrammingLanguagesList />
        </HomeContainer>
      </Layout>
    </>
  );
}
