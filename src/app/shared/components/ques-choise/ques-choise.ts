import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ques-choise',
  templateUrl: './ques-choise.html',
  styleUrls: ['./ques-choise.scss'],
})
export class QuesChoise {
  @Input() Option!: string;
  @Input() value!: string;
  @Input() checked = false;
  @Input() id !:string;

  @Output() select = new EventEmitter<void>();

  onChange() {
    this.select.emit();
  }
}
