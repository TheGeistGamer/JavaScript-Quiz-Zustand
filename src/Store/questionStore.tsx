import { type QuizProps } from '../types/types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'

interface State {
  questions: QuizProps[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => ({
  questions: [],
  currentQuestion: 0,

  fetchQuestions: async (limit: number) => { 
    const res = await fetch('http://localhost:5173/data.json')
    const json = await res.json() as QuizProps[]

    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  },

  selectAnswer: (questionId: number, answerIndex: number) => {
    const { questions } = get()
    // Usar el structuredClone para clonar el objeto
    const newQuestion = structuredClone(questions)

    // encontramos el indice de la pregunta
    const questionIndex = newQuestion.findIndex(q => q.id == questionId) 
    // Obtenemos la informacion de la pregunta
    const questionInfo = newQuestion[questionIndex]

    // Averiguamos si el usuario ha seleccionado la respuesta correcta
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

    if (isCorrectUserAnswer) confetti()

    // Cambiar esta informacion en la copia de la pregunta
    newQuestion[questionIndex] = {
      ...questionInfo, 
      isCorrectUserAnswer,
      userSelectedAnswer: answerIndex
    }

    // Actualizar el estado
    set({ questions: newQuestion })
  },

  goNextQuestion: () => {
    const { currentQuestion, questions } = get()
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion})
    }
  },

  goPreviousQuestion: () => {
    const { currentQuestion } = get()
    const previousQuestion = currentQuestion - 1

    if (previousQuestion >= 0) set({ currentQuestion: previousQuestion })
  },

  reset: () => {
    set({ currentQuestion: 0, questions: [] })
  }
}), {
  name: 'questions'
}))
