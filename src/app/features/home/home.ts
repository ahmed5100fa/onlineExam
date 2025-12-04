import { Component, signal } from '@angular/core';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Sidebar } from "../../shared/components/sidebar/sidebar";
import { Navbar } from "../../shared/components/navbar/navbar";
import { ToastrModule } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  imports: [ RouterOutlet, Sidebar, Navbar , ToastrModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private router: Router ) {}

  ngOnInit() {

  }
}
