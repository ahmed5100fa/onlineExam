import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'auth';
import { Subject, takeUntil } from 'rxjs';
import { UserInfo } from '../../services/user-info';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLinkActive, CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],  // لاحظ: styleUrls وليس styleUrl
})
export class Sidebar implements OnDestroy {
  username = signal('');
  isMenuOpen = false;

  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private _Auth = inject(AuthService);
  private _UserInfo = inject(UserInfo);

  tokens: string = localStorage.getItem('authToken') || '';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this._Auth.logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        }
      });
  }

  ngDoCheck() {
    this._UserInfo.getLoggedUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.username.set(`${res.user.firstName} ${res.user.lastName}`);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
