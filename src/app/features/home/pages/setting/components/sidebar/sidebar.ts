import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'auth';
import { ToastrModule } from 'ngx-toastr';

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

logout() {
    this._Auth.logout(this.tokens).subscribe({
    next : (res) =>{
        localStorage.removeItem("authToken");
         this.router.navigate(['/login']);
    }
  })
}
}
