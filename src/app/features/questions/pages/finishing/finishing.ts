import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FinishQuestion } from "../../../../shared/components/finish-question/finish-question";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-finishing',
  imports: [FinishQuestion, RouterLink],
  templateUrl: './finishing.html',
  styleUrl: './finishing.scss',
})
export class Finishing implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private router = inject(Router)
  @Input() totalcorr !: string;
  @Input() resultWron !: any;
  @Input() wrong !: number;
  @Input() correct !: number;

  @Output() restart = new EventEmitter<void>();
  _id: string = '';

  radius = 50;
  circumference = 2 * Math.PI * this.radius;

  greenDashArray = '';
  greenDashOffset = '';

  ngOnChanges() {
    const total = this.correct + this.wrong;
    if (total === 0) {
      this.greenDashArray = `0 ${this.circumference}`;
      this.greenDashOffset = `${this.circumference}`;
      return;
    }

    const correctLength = (this.correct / total) * this.circumference;
    const wrongLength = this.circumference - correctLength;

    this.greenDashArray = `${correctLength} ${wrongLength}`;
    this.greenDashOffset = `${wrongLength}`;
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this._id = params['id'] || '';
      console.log('ID from route:', this._id);
    });
  }

restartQuiz() {
  this.restart.emit();
}

}
