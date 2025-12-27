import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizCard } from "../../ui/components/quiz-card/quiz-card";
import { ExamService } from '../../services/exam-service';
import type { Exam } from '../../exam-inter';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [QuizCard],
  templateUrl: './exams.html',
  styleUrls: ['./exams.scss'],
})
export class Exams implements OnInit, OnDestroy {

  private _activatedRoute = inject(ActivatedRoute);
  private _examService = inject(ExamService);

  subjId = signal<string>('');
  Exam = signal<Exam[]>([]);

  private subscriptions = new Subscription();

  getAllExams() {
    const sub = this._examService.getAllExams().subscribe({
      next: (res) => {
        this.Exam.set(res.exams);
      }
    });
    this.subscriptions.add(sub);
  }

  ngOnInit(): void {
    const routeSub = this._activatedRoute.params.subscribe((par) => {
      this.subjId.set(par['id']);
      this.getAllExams();
    });
    this.subscriptions.add(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
