import { Container, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./Store/questionStore"
import { JavaScriptLogo } from "./icons/JavaScriptLogo"
import { Start } from "./page/Start"
import { Game } from "./Game"

export const App: React.FC = () => {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
          <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'} >
            <JavaScriptLogo />
            <Typography variant="h2" component={'h1'}>
              JavaScript Quizz
            </Typography>
          </Stack>

          { questions.length === 0 && <Start /> }
          { questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}
