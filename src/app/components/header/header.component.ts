import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Signals for reactive state management (Angular 20 feature)
  private readonly scrollY = signal(0);
  readonly isMenuOpen = signal(false);
  
  // Computed signals for derived state
  readonly isScrolled = computed(() => this.scrollY() > 50);
  readonly headerClasses = computed(() => ({
    'header--scrolled': this.isScrolled(),
    'header--menu-open': this.isMenuOpen()
  }));

  // Navigation items
  readonly navItems = [
    { label: 'Home', anchor: 'home', href: '#home' },
    { label: 'About', anchor: 'about', href: '#about' },
    { label: 'Skills', anchor: 'skills', href: '#skills' },
    { label: 'Projects', anchor: 'projects', href: '#projects' },
    { label: 'Education', anchor: 'education', href: '#education' },
    { label: 'Certifications', anchor: 'certifications', href: '#certifications' },
    { label: 'Contact', anchor: 'contact', href: '#contact' }
  ];

  ngOnInit(): void {
    this.setupScrollListener();
  }

  private setupScrollListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.scrollY.set(window.scrollY);
      });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update(current => !current);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  scrollToSection(anchor: string): void {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    this.closeMenu();
  }
}