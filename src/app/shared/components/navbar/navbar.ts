import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, OnDestroy {
  private router = inject(Router);
  private location = inject(Location);
  private sanitizer = inject(DomSanitizer);
  private routerSubscription!: Subscription;

  currentPage: SafeHtml = this.sanitizer.bypassSecurityTrustHtml('Dashboard');
  currentUrl = '';
  breadcrumbText = '';

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
        this.updatePageInfo();
      });

    this.currentUrl = this.router.url;
    this.updatePageInfo();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  updatePageInfo(): void {

    const route = this.getCurrentRoute();
    this.breadcrumbText = this.getPlainTitle();

    if (route && route.data && route.data['title']) {
      const title = route.data['title'];
      this.currentPage = this.sanitizer.bypassSecurityTrustHtml(title);
    } else {
      const defaultTitle = this.getDefaultTitle();
      this.currentPage = this.sanitizer.bypassSecurityTrustHtml(defaultTitle);
    }
  }

  private getCurrentRoute(): any {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private getDefaultTitle(): string {
    if (this.currentUrl.includes('setting')) {
      return '<i class="fa-regular fa-user me-2"></i> Settings';
    } else if (this.currentUrl.includes('diplomas')) {
      return '<i class="fa-solid fa-graduation-cap me-2"></i> Diplomas';
    }else if (this.currentUrl.includes('exams')) {
      return '<i class="fa-solid fa-book-open"></i></i> Exams';
    }
    return '<i class="fa-solid fa-house me-2"></i>Dashboard';
  }

  private getPlainTitle(): string {
    let title = '';
    const route = this.getCurrentRoute();

    if (route && route.data && route.data['title']) {
      title = route.data['title'].replace(/<[^>]*>/g, '').trim();
    }

    if (!title) {
      if (this.currentUrl.includes('setting')) {
        title = 'Settings';
      } else if (this.currentUrl.includes('diplomas')) {
        title = 'Diplomas';
      }else if (this.currentUrl.includes('exams')) {
        title = 'Exams';
      } else {
        title = 'Dashboard';
      }
    }

    return title;
  }

  canGoBack(): boolean {
    return !['/home/diplomas', '/home'].includes(this.currentUrl);
  }

  goBack(): void {
    this.location.back();
  }

  getBreadcrumbCurrent(): string {
    return this.breadcrumbText;
  }

  isDiplomasPage(): boolean {
    return this.breadcrumbText === 'Diplomas' || this.currentUrl.includes('diplomas');
  }
}
