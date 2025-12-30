import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { QuestionServ } from './services/question-serv';
import { Answer, Question, Root } from './Interfaces/question-inter';
import { QuesChoise } from '../../shared/components/ques-choise/ques-choise';
import { Finishing } from './pages/finishing/finishing';

import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, QuesChoise, Finishing],
  templateUrl: './questions.html',
  styleUrls: ['./questions.scss'],
})
export class Questions implements OnInit, OnDestroy, AfterViewInit {

  private route = inject(ActivatedRoute);
  private questionServ = inject(QuestionServ);
  private subs = new Subscription();

  @ViewChild('timerChartCanvas', { static: false })
  timerChartCanvas!: ElementRef<HTMLCanvasElement>;

  timerChart?: Chart;

  // ================= Signals =================
  examId = signal('');
  questions = signal<Question[]>([]);
  answers = signal<Answer[]>([]);
  questionLength = signal(0);
  questionIndex = signal(0);

  questionText = signal('');
  examName = signal('');
  questionDuration = signal(0);

  selectedAnswerIndex = signal(-1);
  isFinish = signal(false);

  userAnswers = signal<Map<number, number>>(new Map());
  remainingTimes = signal<Map<number, number>>(new Map());

  currentTimer = signal(0);
  timerInterval: any = null;

  private isAutoMoving = false;

  // ================= Result =================
  resultWrong = signal<any[]>([]);
  correct = signal(0);
  wrong = signal(0);
  total = signal('');

  // ================= Lifecycle =================
  ngOnInit(): void {
    const sub = this.route.params.subscribe(params => {
      this.examId.set(params['id']);
      this.getAllQuestions(this.examId());
    });
    this.subs.add(sub);
  }

  ngAfterViewInit(): void {
    this.createTimerChart();
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.subs.unsubscribe();
    this.timerChart?.destroy();
  }

  // ================= Timer =================
  private clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private startTimer(): void {
    this.clearTimer();
    this.isAutoMoving = false;

    const idx = this.questionIndex();
    const duration = this.questionDuration();
    const savedTime = this.remainingTimes().get(idx);

    this.currentTimer.set(savedTime ?? duration);
    this.updateTimerChart();

    this.timerInterval = setInterval(() => {
      this.currentTimer.update(time => {

        if (time <= 1) {
          if (this.isAutoMoving) return 0;

          this.isAutoMoving = true;
          this.clearTimer();
          this.autoMoveToNextQuestion();
          return 0;
        }

        const newTime = time - 1;
        const map = new Map(this.remainingTimes());
        map.set(idx, newTime);
        this.remainingTimes.set(map);

        return newTime;
      });

      this.updateTimerChart();
    }, 1000);
  }

  // ================= Chart =================
  private createTimerChart(): void {
    if (!this.timerChartCanvas) {
      console.warn('timerChartCanvas not ready yet!');
      return;
    }

    const canvas = this.timerChartCanvas.nativeElement;
    this.timerChart?.destroy();

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [0, 1],
          backgroundColor: ['#E8E8E8', '#4CAF50'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '85%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    };

    this.timerChart = new Chart(canvas, config);
  }

  private updateTimerChart(): void {
    if (!this.timerChart) return;

    const duration = this.questionDuration();
    const remaining = this.currentTimer();
    const elapsed = Math.max(0, duration - remaining);

    this.timerChart.data.datasets[0].data = [elapsed, remaining];
    this.timerChart.data.datasets[0].backgroundColor =
      remaining <= 10
        ? ['#E8E8E8', '#F44336']
        : ['#E8E8E8', '#4CAF50'];

    this.timerChart.update('none');
  }

  // ================= Questions =================
  private updateCurrentQuestion(): void {
    const idx = this.questionIndex();
    const list = this.questions();

    if (!list[idx]) return;

    const q = list[idx];

    this.questionText.set(q.question);
    this.answers.set(q.answers);
    this.examName.set(q.exam.title);
    this.questionDuration.set(q.exam.duration);

    const savedAnswer = this.userAnswers().get(idx);
    this.selectedAnswerIndex.set(savedAnswer ?? -1);

    this.startTimer();
  }

  private autoMoveToNextQuestion(): void {
    if (this.questionIndex() < this.questionLength() - 1) {
      this.questionIndex.update(v => v + 1);

      setTimeout(() => {
        this.updateCurrentQuestion();
      });

    } else {
      this.clearTimer();
    }
  }

  getAllQuestions(id: string): void {
    const sub = this.questionServ.getAllquestions(id).subscribe(res => {
      this.questions.set(res.questions);
      this.questionLength.set(res.questions.length);
      this.questionIndex.set(0);
      this.userAnswers.set(new Map());
      this.remainingTimes.set(new Map());
      this.updateCurrentQuestion();
    });
    this.subs.add(sub);
  }

  nextQuestion(): void {
    if (this.questionIndex() < this.questionLength() - 1) {
      this.clearTimer();
      this.questionIndex.update(v => v + 1);
      this.updateCurrentQuestion();
    }
  }

  prevQuestion(): void {
    if (this.questionIndex() > 0) {
      this.clearTimer();
      this.questionIndex.update(v => v - 1);
      this.updateCurrentQuestion();
    }
  }

  // ================= Answers =================
  selectAnswer(index: number): void {
    const idx = this.questionIndex();
    this.selectedAnswerIndex.set(index);

    const map = new Map(this.userAnswers());
    map.set(idx, index);
    this.userAnswers.set(map);
  }

  // ================= Submit =================
  result(): void {
    const formatted = this.questions().map((q, i) => {
      const ansIndex = this.userAnswers().get(i);
      return {
        questionId: q._id,
        correct: ansIndex !== undefined ? q.answers[ansIndex]?.key : undefined
      };
    });

    const data: Root = {
      answers: formatted,
      time: 10
    };

    const sub = this.questionServ.submitQuestions(data).subscribe(res => {
      this.resultWrong.set(res.WrongQuestions);
      this.correct.set(res.correct);
      this.wrong.set(res.wrong);
      this.total.set(res.total);
      this.isFinish.set(true);
      this.clearTimer();
    });

    this.subs.add(sub);
  }

  // ================= Restart =================
  restartQuiz(): void {
    this.isFinish.set(false);
    this.questionIndex.set(0);
    this.userAnswers.set(new Map());
    this.remainingTimes.set(new Map());
    this.correct.set(0);
    this.wrong.set(0);
    this.total.set('');
    this.clearTimer();

    setTimeout(() => {
      this.createTimerChart();
      this.updateCurrentQuestion();
    }, 0);
  }
}
