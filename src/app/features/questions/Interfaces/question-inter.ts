export interface QuestionInter {
  message: string
  questions: Question[]
}

export interface Question {
  answers: Answer[]
  type: string
  _id: string
  question: string
  correct: string
  subject: any
  exam: Exam
  createdAt: string
}

export interface Answer {
  answer: string
  key: string
}

export interface Exam {
  _id: string
  title: string
  duration: number
  subject: string
  numberOfQuestions: number
  active: boolean
  createdAt: string
}

// submit result

export interface Root {
  answers: AnswerSubmit[];
  time: number;
}

export interface AnswerSubmit {
  questionId: string;
  correct?: string;
}
