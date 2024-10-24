import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from './Store/questionStore'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { QuizProps } from './types/types'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

const getBackGroundColor = (info: QuizProps, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  
  // Usuario no ha seleccionado nada todavia
  if (userSelectedAnswer == null) return 'transparent'

  // Si ya selecciono pero la solucion es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

  // Si esta es la solucion correcta
  if (index === correctAnswer) return 'green'

  // Si esta es la seleccion del usuario pero noes correcta
  if (index === userSelectedAnswer) return 'red'

  // Si no es ninguna de las anteriores
  return 'transparent'
}

const Question = ({ info }: { info: QuizProps }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ textAlign: 'left', p: 2, bgcolor: '#222', marginTop: 4 }}>
      <Typography variant='h5'>
        { info.question }
      </Typography>

      <SyntaxHighlighter language='javascript' style={atelierDuneDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333', textAlign: 'center' }} disablePadding>
          { info.answers.map((answer, index) => (
              <ListItem key={index} disablePadding divider>
                <ListItemButton
                  disabled={info.userSelectedAnswer != null}
                  sx={{ backgroundColor: getBackGroundColor(info, index)}} 
                  onClick={createHandleClick(index)}>
                  <ListItemText primary={answer} sx={{ textAlign: 'center' }}/>
                </ListItemButton>
              </ListItem>
            ))
          }
      </List>

    </Card>
  )
}

export const Game = () => {
  const { questions, currentQuestion, goNextQuestion, goPreviousQuestion } = useQuestionsStore(state => state)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={(currentQuestion > questions.length - 1)}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>

      <Question info={questionInfo} />
      
      <Footer />
    </>
  )
}