import { Component, inject, signal, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DiplomasService } from './services/diplomasService';
import type { Subject } from './interfaces/diplomas-interface';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-diplomas',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './diplomas.html',
  styleUrls: ['./diplomas.scss'],
})
export class Diplomas implements OnDestroy {

  private diplomasService = inject(DiplomasService);
  private subscription = new Subscription();

  subjArr = signal<Subject[]>([]);

  constructor() {
    const sub = this.diplomasService.getAllSubjects().subscribe({
      next: (res) => this.subjArr.set(res.subjects),
      error: (err) => console.error(err)
    });

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
