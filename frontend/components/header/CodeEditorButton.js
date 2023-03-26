import { Button, styled } from "@mui/material";
import { useRouter } from "next/router";

const CodeEditorStyledButton = styled(Button)(({ theme }) => ({
  color: theme.commonColors.white,
}));

function CodeEditorButton() {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("code-editor");
  };

  return (
    <CodeEditorStyledButton onClick={onClickHandler}>
      Code Editor
    </CodeEditorStyledButton>
  );
}

export default CodeEditorButton;
