import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export interface PageInfo {
  title: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
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
  private routerSubscription!: Subscription;

  // Input properties
  @Input() pageInfo: PageInfo = { title: 'Dashboard', icon: 'fa-solid fa-house', iconPosition: 'left' };
  @Input() showHomeBreadcrumb: boolean = true;
  @Input() homeBreadcrumbText: string = 'Home';
  @Input() homeBreadcrumbLink: string = '/home/diplomas';

  currentUrl = '';
  breadcrumbText = '';

  ngOnInit(): void {
    console.log('Navbar initialized');

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('NavigationEnd event:', event.url);
        this.currentUrl = event.url;
        this.updatePageInfo();
      });

    this.currentUrl = this.router.url;
    console.log('Initial URL:', this.currentUrl);
    this.updatePageInfo();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  updatePageInfo(): void {
    console.log('Updating page info for URL:', this.currentUrl);
    const route = this.getCurrentRoute();
    console.log('Current route data:', route?.data);

    this.breadcrumbText = this.getPlainTitle();

    // First, check for pageInfo in route data
    if (route?.data?.['pageInfo']) {
      console.log('Found pageInfo in route data:', route.data['pageInfo']);
      this.pageInfo = route.data['pageInfo'];
    }
    // Then check for title (for backward compatibility)
    else if (route?.data?.['title']) {
      console.log('Found title in route data:', route.data['title']);
      this.pageInfo = this.extractPageInfoFromTitle(route.data['title']);
    }
    // Fallback to default based on URL
    else {
      console.log('Using default page info based on URL');
      this.pageInfo = this.getDefaultPageInfo();
    }

    console.log('Final pageInfo:', this.pageInfo);
  }

  private extractPageInfoFromTitle(titleHtml: string): PageInfo {
    console.log('Extracting from title HTML:', titleHtml);

    // Try to extract icon from HTML
    const iconMatch = titleHtml.match(/class="([^"]+)"/);
    const icon = iconMatch ? iconMatch[1] : this.getDefaultIcon();

    // Extract text from HTML
    const textMatch = titleHtml.match(/>(.+)<\/i>/);
    let titleText = '';

    if (textMatch) {
      // Remove any HTML tags from the text after the icon
      titleText = textMatch[1].replace(/<[^>]*>/g, '');
    } else {
      // If no icon found, remove all HTML tags
      titleText = titleHtml.replace(/<[^>]*>/g, '').trim();
    }

    return {
      title: titleText || this.getPlainTitle(),
      icon: icon,
      iconPosition: 'left'
    };
  }

  private getCurrentRoute(): any {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private getDefaultPageInfo(): PageInfo {
    const path = this.currentUrl.toLowerCase();
    console.log('Getting default page info for path:', path);

    if (path.includes('setting') || path.includes('profile') || path.includes('changepass')) {
      return {
        title: 'Account Settings',
        icon: 'fa-regular fa-user',
        iconPosition: 'left'
      };
    } else if (path.includes('diplomas')) {
      return {
        title: 'Diplomas',
        icon: 'fa-solid fa-graduation-cap',
        iconPosition: 'left'
      };
    } else if (path.includes('exams')) {
      return {
        title: 'Exams',
        icon: 'fa-solid fa-book-open',
        iconPosition: 'left'
      };
    } else if (path.includes('questions')) {
      return {
        title: 'Questions',
        icon: 'fa-regular fa-circle-question',
        iconPosition: 'left'
      };
    }
    return {
      title: 'Dashboard',
      icon: 'fa-solid fa-house',
      iconPosition: 'left'
    };
  }

  private getDefaultIcon(): string {
    const path = this.currentUrl.toLowerCase();

    if (path.includes('setting') || path.includes('profile') || path.includes('changepass')) {
      return 'fa-regular fa-user';
    } else if (path.includes('diplomas')) {
      return 'fa-solid fa-graduation-cap';
    } else if (path.includes('exams')) {
      return 'fa-solid fa-book-open';
    } else if (path.includes('questions')) {
      return 'fa-regular fa-circle-question';
    }
    return 'fa-solid fa-house';
  }

  private getPlainTitle(): string {
    let title = '';
    const route = this.getCurrentRoute();

    if (route?.data?.['pageInfo']) {
      title = route.data['pageInfo'].title;
    } else if (route?.data?.['title']) {
      title = route.data['title'].replace(/<[^>]*>/g, '').trim();
    }

    if (!title) {
      const path = this.currentUrl.toLowerCase();

      if (path.includes('setting') || path.includes('profile') || path.includes('changepass')) {
        title = 'Account Settings';
      } else if (path.includes('diplomas')) {
        title = 'Diplomas';
      } else if (path.includes('exams')) {
        title = 'Exams';
      } else if (path.includes('questions')) {
        title = 'Questions';
      } else {
        title = 'Dashboard';
      }
    }

    console.log('Plain title:', title);
    return title;
  }

  canGoBack(): boolean {
    return !['/home/diplomas', '/home'].includes(this.currentUrl);
  }

  goBack(): void {
    this.location.back();
  }

  isDiplomasPage(): boolean {
    return this.breadcrumbText === 'Diplomas' || this.currentUrl.includes('diplomas');
  }

  // Helper method to check if icon exists
  hasIcon(): boolean {
    return !!this.pageInfo?.icon;
  }

  // Helper method to get icon position class
  getIconPositionClass(): string {
    return this.pageInfo.iconPosition === 'right' ? 'ms-2' : 'me-2';
  }
}
