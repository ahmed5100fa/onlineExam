import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";

@Component({
  selector: 'app-setting',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './setting.html',
  styleUrl: './setting.scss',
})
export class Setting {

}
