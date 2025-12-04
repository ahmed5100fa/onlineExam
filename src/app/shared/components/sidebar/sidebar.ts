import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { AuthService } from 'auth';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLinkActive, CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
username = "Ahmed Mohamed";
isMenuOpen = false;
private router = inject(Router);
private _Auth = inject(AuthService);
tokens: string = localStorage.getItem("authToken") || '';

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

logout() {
  this._Auth.logout(this.tokens).subscribe({
    next : (res) =>{
        localStorage.removeItem("authToken");
         this.router.navigate(['/login']);
    }
  })
}

}
