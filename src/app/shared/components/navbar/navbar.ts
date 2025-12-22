import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter, Subscription } from 'rxjs';

interface Breadcrumb {
  label: string;
  link?: string;
  active: boolean;
}

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

  currentUrl = '';
  currentPage: SafeHtml = '';
  breadcrumbs: Breadcrumb[] = [];

  private sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
        this.updateUI();
      });

    this.currentUrl = this.router.url;
    this.updateUI();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updateUI(): void {
    this.buildBreadcrumbs();
    this.currentPage = this.sanitizer.bypassSecurityTrustHtml(
      this.getPageTitleWithIcon()
    );
  }

  private buildBreadcrumbs(): void {
    const crumbs: Breadcrumb[] = [];

    // Diplomas (root)
    if (this.currentUrl.includes('diplomas')) {
      this.breadcrumbs = [{ label: 'Diplomas', active: true }];
      return;
    }

    // Home always present unless diplomas page
    crumbs.push({
      label: 'Home',
      link: '/home/diplomas',
      active: false
    });

    // Exams and Questions handling
    if (this.currentUrl.includes('exams') || this.currentUrl.includes('questions')) {

      // نحاول نجيب examId من url
      const examId = this.extractIdFromUrl('exams') || this.extractIdFromUrl('questions');

      crumbs.push({
        label: 'Exams',
        link: examId ? `/home/exams/${examId}` : undefined,
        active: !this.currentUrl.includes('questions')
      });
    }

    // Questions
    if (this.currentUrl.includes('questions')) {
      crumbs.push({
        label: 'Questions',
        active: true
      });
    }

    // Settings
    if (this.currentUrl.includes('setting')) {
      crumbs.push({
        label: 'Settings',
        active: true
      });
    }

    this.breadcrumbs = crumbs;
  }

  private extractIdFromUrl(type: 'exams' | 'questions'): string | null {
    const parts = this.currentUrl.split('/');
    const index = parts.indexOf(type);
    if (index !== -1 && parts[index + 1]) {
      return parts[index + 1];
    }
    return null;
  }

  private getPageTitleWithIcon(): string {

    if (this.currentUrl.includes('diplomas')) {
      return `<i class="fa-solid fa-graduation-cap me-2"></i> Diplomas`;
    }

    if (this.currentUrl.includes('exams')) {
      return `<i class="fa-solid fa-book-open"></i> Exams`;
    }

    if (this.currentUrl.includes('questions')) {
      return `<i class="fa-regular fa-circle-question me-2"></i> Questions`;
    }

    if (this.currentUrl.includes('setting')) {
      return `<i class="fa-regular fa-user"></i> Account Settings`;
    }

    return `<i class="fa-solid fa-house me-2"></i> Dashboard`;
  }

  canGoBack(): boolean {
    return !['/home', '/home/diplomas'].includes(this.currentUrl);
  }

  goBack(): void {
    this.location.back();
  }
}
