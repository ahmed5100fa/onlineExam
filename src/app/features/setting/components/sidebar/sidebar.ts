import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'auth';
import { ToastrModule } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLinkActive , RouterLink , ToastrModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private router = inject(Router);
  private _Auth = inject(AuthService);
  tokens: string = localStorage.getItem("authToken") || '';
   private destroy$ = new Subject<void>();

logout() {
    this._Auth.logout().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
    next : (res) =>{
        localStorage.removeItem("authToken");
         this.router.navigate(['/login']);
    }
  })
}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
