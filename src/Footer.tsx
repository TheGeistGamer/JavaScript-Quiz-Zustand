import { Button } from '@mui/material'
import { useQuestionData } from './hooks/useQuestionData'
import { useQuestionsStore } from './Store/questionStore'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionData()
  const { reset } = useQuestionsStore(state => state)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅${correct} - ❌${incorrect} - ❓ ${unanswered} sin responder`}</strong>
      
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
    </footer>
  )
}
