import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-finish-question',
  imports: [],
  templateUrl: './finish-question.html',
  styleUrl: './finish-question.scss',
})
export class FinishQuestion {
  @Input() questionName !: string;
  @Input() correctAnswer !: string;
  @Input() wrongAnswer !: string;
}
