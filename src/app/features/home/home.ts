import { Component, signal } from '@angular/core';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Sidebar } from "../../shared/components/sidebar/sidebar";
import { Navbar } from "../../shared/components/navbar/navbar";
import { ToastrModule } from 'ngx-toastr';
import { HomeSidebarHeader } from "./main-layout/home-sidebar-header/home-sidebar-header";
@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Sidebar, Navbar, ToastrModule, HomeSidebarHeader],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private router: Router ) {}

  ngOnInit() {

  }
}
