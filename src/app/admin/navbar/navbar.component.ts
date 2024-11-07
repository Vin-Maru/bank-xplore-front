import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public title: string = 'Bank-Xplore';
  public navbarStyle: any = {};
  public isMenuOpen: boolean = false; // State to track if the main menu is open
  public isDropdownOpen: boolean = false; // State to track if the dropdown menu is open
  notificationCount: number = 0;


  constructor(private notificationService: NotificationService,
    private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}


    ngOnInit() {
      this.notificationService.notificationCount$.subscribe(count => {
        this.notificationCount = count;
      });
    }
  // Opens the main menu
  openMenu() {
    this.isMenuOpen = true;
  }

  // Closes the main menu when the mouse leaves or a link is clicked
  closeMenuIfNotClicked(event: MouseEvent) {
    const element = event.relatedTarget as HTMLElement;
    const navbar = document.querySelector('nav');

    // Ensure the mouse has left the entire navbar (toggle + menu)
    if (navbar && !navbar.contains(element)) {
      this.isMenuOpen = false;
    }
  }

  // Opens the dropdown menu
  openDropdown() {
    this.isDropdownOpen = true;
  }

  // Closes the dropdown menu when the mouse leaves
  closeDropdown() {
    this.isDropdownOpen = false;
  }

  // Close the main menu on clicking any link
  closeMenu() {
    this.isMenuOpen = false;
    this.isDropdownOpen = false; // Also close the dropdown
  }

  // HostListener listens to the scroll event for styling the navbar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.scrollY;
      this.updateNavbarStyle(scrollY);
    }
  }

  // Dynamically update navbar style based on scroll position
  updateNavbarStyle(scrollY: number) {
    if (scrollY > 50) {
      this.navbarStyle = { 
        position: 'fixed', 
        top: '0', 
        left: '0', 
        width: '100%', 
        backgroundColor: '#1daddd',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)', 
        transition: 'all 1s ease-in-out'
      };
    } else {
      this.navbarStyle = { 
        position: 'relative', 
        transition: 'all 1s ease-in-out'
      };
    }
  }
}
