import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServ } from './services/question-serv';
import { Answer, Question, Root } from './Interfaces/question-inter';
import { QuesChoise } from '../../shared/components/ques-choise/ques-choise';
import { CommonModule } from '@angular/common';
import { Finishing } from "./pages/finishing/finishing";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions',
  imports: [QuesChoise, CommonModule, Finishing],
  templateUrl: './questions.html',
  styleUrl: './questions.scss',
})
export class Questions implements OnInit, OnDestroy {
  private _activatedRoute = inject(ActivatedRoute);
  private _questionServ = inject(QuestionServ);

  private subscriptions = new Subscription();

  // Signals
  examId = signal<string>('');
  quistionAnswer = signal<Answer[]>([]);
  quistions = signal<Question[]>([]);
  quistionLength = signal<number>(0);
  questionIndex = signal<number>(0);
  questionDuration = signal<number>(0);
  theQuession = signal<string>('');
  examName = signal<string>('');
  selectedAnswerIndex = signal<number>(-1);
  isFinish = signal<boolean>(false);

  userAnswers = signal<Map<number, number>>(new Map());
  remainingTimes = signal<Map<number, number>>(new Map());
  currentTimer = signal<number>(0);
  timerInterval: any = null;

  // result answers
  resultWron = signal([]);
  totalcorr = signal('');
  correct = signal(0);
  wrong = signal(0);
  dataLength = signal(0);

  ngOnInit(): void {
    const routeSub = this._activatedRoute.params.subscribe((par) => {
      this.examId.set(par['id']);
      this.getAllQuesions(this.examId());
    });
    this.subscriptions.add(routeSub);
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.subscriptions.unsubscribe();
  }

  private clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private startTimer(): void {
    this.clearTimer();

    const idx = this.questionIndex();
    const duration = this.questionDuration();

    const savedTime = this.remainingTimes().get(idx);
    const startTime = savedTime !== undefined ? savedTime : duration;

    this.currentTimer.set(startTime);

    this.timerInterval = setInterval(() => {
      this.currentTimer.update(time => {
        if (time <= 1) {
          clearInterval(this.timerInterval);
          this.autoMoveToNextQuestion();
          return 0;
        }

        const newTime = time - 1;
        const updatedMap = new Map(this.remainingTimes());
        updatedMap.set(idx, newTime);
        this.remainingTimes.set(updatedMap);

        return newTime;
      });

      this.updateProgressCircle();
    }, 1000);
  }

  private updateProgressCircle(): void {
    const circle = document.querySelector('.progress-ring__circle') as SVGCircleElement;
    if (circle) {
      const duration = this.questionDuration();
      const currentTime = this.currentTimer();
      const progress = currentTime / duration;
      const circumference = 2 * Math.PI * 30;
      const offset = circumference * (1 - progress);
      circle.style.strokeDashoffset = offset.toString();
      circle.style.strokeDasharray = circumference.toString();
    }
  }

  private autoMoveToNextQuestion(): void {
    if (this.questionIndex() < this.quistionLength() - 1) {
      this.nextQues();
    }
  }

  private updateCurrentQuestion(): void {
    const idx = this.questionIndex();
    const questions = this.quistions();

    if (questions.length > 0 && idx >= 0 && idx < questions.length) {
      const currentQuestion = questions[idx];
      this.theQuession.set(currentQuestion.question);
      this.quistionAnswer.set(currentQuestion.answers);
      this.examName.set(currentQuestion.exam.title);
      this.questionDuration.set(currentQuestion.exam.duration);

      const savedAnswer = this.userAnswers().get(idx);
      this.selectedAnswerIndex.set(savedAnswer !== undefined ? savedAnswer : -1);

      this.startTimer();
    }
  }

  getAllQuesions(id: string) {
    const sub = this._questionServ.getAllquestions(id).subscribe({
      next: (res) => {
        this.quistions.set(res.questions);
        this.quistionLength.set(res.questions.length);
        this.questionIndex.set(0);
        this.userAnswers.set(new Map());
        this.remainingTimes.set(new Map());
        this.updateCurrentQuestion();
      },
      error: (err) => {
        console.error('Error loading questions:', err);
      }
    });
    this.subscriptions.add(sub);
  }

  nextQues() {
    this.clearTimer();

    if (this.questionIndex() < this.quistionLength() - 1) {
      this.questionIndex.update((val) => val + 1);
      this.updateCurrentQuestion();
    }
  }

  prevQues() {
    this.clearTimer();

    if (this.questionIndex() > 0) {
      this.questionIndex.update((val) => val - 1);
      this.updateCurrentQuestion();
    }
  }

  submitResult(data: Root) {
    const sub = this._questionServ.submitQuestions(data).subscribe({
      next: (res) => {
        console.log(res);
        this.resultWron.set(res.WrongQuestions);
        this.totalcorr.set(res.total);
        this.wrong.set(res.wrong);
        this.correct.set(res.correct);
        this.isFinish.set(true);
        this.clearTimer();
      }
    });
    this.subscriptions.add(sub);
  }

  result() {
    const formattedAnswers = this.quistions().map((question, index) => {
      const answerIndex = this.userAnswers().get(index);

      if (answerIndex === undefined) {
        return {
          questionId: question._id,
          correct: undefined
        };
      }

      const selectedAnswer = question.answers[answerIndex];

      return {
        questionId: question._id,
        correct: selectedAnswer ? selectedAnswer.key : undefined
      };
    });

    console.log('Formatted Answers:', formattedAnswers);

    const data: Root = {
      answers: formattedAnswers,
      time: 10
    };

    this.submitResult(data);
  }

  selectAnswer(index: number): void {
    const currentIndex = this.questionIndex();
    this.selectedAnswerIndex.set(index);

    const updatedMap = new Map(this.userAnswers());
    updatedMap.set(currentIndex, index);
    this.userAnswers.set(updatedMap);
  }

  restartQuiz() {
    this.isFinish.set(false);

    // reset index
    this.questionIndex.set(0);

    // reset answers
    this.selectedAnswerIndex.set(-1);
    this.userAnswers.set(new Map());

    // reset results
    this.correct.set(0);
    this.wrong.set(0);
    this.resultWron.set([]);
    this.totalcorr.set('');

    // reset timer
    this.remainingTimes.set(new Map());
    this.clearTimer();
    this.updateCurrentQuestion();
  }
}
