import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  imports: [RouterLink],
  templateUrl: './quiz-card.html',
  styleUrl: './quiz-card.scss',
})
export class QuizCard {
  @Input() quizeName !: string;
  @Input() quizId!: string;
  @Input() questionNum !: number;
  @Input() quizeDuration !: number;
}
