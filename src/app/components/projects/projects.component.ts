import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  startDate: string;
  endDate?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  // Animation states
  readonly isVisible = signal(false);
  readonly selectedCategory = signal<string>('all');
  readonly selectedProject = signal<Project | null>(null);

  constructor() {
    // Check if we're on mobile and set immediate visibility
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // Set immediate visibility for mobile to prevent loading issues
        setTimeout(() => this.isVisible.set(true), 100);
      }
    }
  }

  // Project data - Updated with actual projects from GitHub
  readonly projects: Project[] = [
    {
      id: '1',
      title: 'Advanced Stock Prediction System',
      description: 'Machine learning-powered stock analysis and recommendation system with technical indicators',
      longDescription: 'A sophisticated stock analysis platform that fetches historical data, performs technical analysis using indicators like RSI, MACD, SMA, and ATR. Features concurrent data processing, customizable recommendation criteria, and comprehensive logging for debugging.',
      technologies: ['Python', 'yfinance', 'Pandas', 'NumPy', 'Technical Analysis', 'Machine Learning'],
      category: 'AI/ML',
      image: '/assets/projects/stock-prediction.jpg',
      githubUrl: 'https://github.com/ankitkumar131/Stock_prediction_app',
      status: 'completed',
      featured: true,
      startDate: '2024-06-01',
      endDate: '2024-07-09'
    },
    {
      id: '2',
      title: 'Image Dehazing Tool',
      description: 'Advanced image processing application using Dark Channel Prior algorithm for haze removal',
      longDescription: 'A sophisticated image dehazing application implementing enhanced Dark Channel Prior method with guided filter refinement, adaptive histogram equalization, and modern GUI. Features real-time processing, synchronized zoom controls, and comprehensive error handling.',
      technologies: ['Python', 'OpenCV', 'NumPy', 'Tkinter', 'PIL', 'Matplotlib', 'Image Processing'],
      category: 'Computer Vision',
      image: '/assets/projects/dehaze.jpg',
      githubUrl: 'https://github.com/ankitkumar131/dehaze-image',
      status: 'completed',
      featured: true,
      startDate: '2024-05-01',
      endDate: '2024-05-26'
    },
    {
      id: '3',
      title: 'Restaurant E-Commerce Platform (Foofio)',
      description: 'Full-featured Angular 19 e-commerce application for bakery business with cart and checkout',
      longDescription: 'A comprehensive e-commerce platform built with Angular 19 and Tailwind CSS. Features product catalog, shopping cart, user authentication, multi-step checkout, order management, and responsive design. Includes admin features and payment integration.',
      technologies: ['Angular 19', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Angular Router', 'Forms'],
      category: 'Web Development',
      image: '/assets/projects/restaurant.jpg',
      githubUrl: 'https://github.com/ankitkumar131/restaurant-website',
      status: 'completed',
      featured: true,
      startDate: '2024-04-01',
      endDate: '2024-05-08'
    },
    {
      id: '4',
      title: 'Angular CRUD Application',
      description: 'Complete CRUD operations implementation with Angular 18 and modern practices',
      longDescription: 'A comprehensive Angular application demonstrating full CRUD operations with modern Angular practices, reactive forms, component communication, and clean architecture patterns.',
      technologies: ['Angular 18', 'TypeScript', 'RxJS', 'Angular CLI', 'Reactive Forms'],
      category: 'Web Development',
      image: '/assets/projects/crud-angular.jpg',
      githubUrl: 'https://github.com/ankitkumar131/CURD-in-Angular-',
      status: 'completed',
      featured: false,
      startDate: '2024-08-01',
      endDate: '2024-09-09'
    },
    {
      id: '5',
      title: 'Payroll Management System',
      description: 'TypeScript-based payroll management application built with StackBlitz',
      longDescription: 'A modern payroll management system built with TypeScript, featuring employee management, salary calculations, and reporting capabilities.',
      technologies: ['TypeScript', 'StackBlitz', 'Web APIs', 'Modern JavaScript'],
      category: 'Web Development',
      image: '/assets/projects/payroll.jpg',
      githubUrl: 'https://github.com/ankitkumar131/payroll',
      status: 'completed',
      featured: false,
      startDate: '2024-09-01',
      endDate: '2024-10-06'
    },
    {
      id: '6',
      title: 'Modern Angular Portfolio',
      description: 'Current portfolio website built with Angular 20 and modern design principles',
      longDescription: 'A comprehensive portfolio website showcasing projects and skills, built with Angular 20, featuring zoneless change detection, modern UI components, and responsive design.',
      technologies: ['Angular 20', 'TypeScript', 'SCSS', 'Signals', 'Modern CSS'],
      category: 'Web Development',
      image: '/assets/projects/portfolio.jpg',
      githubUrl: 'https://github.com/ankitkumar131/Ankit-portfolio-final-Angular',
      status: 'completed',
      featured: true,
      startDate: '2024-09-01',
      endDate: '2024-09-13'
    }
  ];

  // Computed properties
  readonly categories = computed(() => {
    const cats = ['all', ...new Set(this.projects.map(p => p.category))];
    return cats.map(cat => ({
      name: cat === 'all' ? 'All Projects' : cat,
      value: cat,
      count: cat === 'all' ? this.projects.length : this.projects.filter(p => p.category === cat).length
    }));
  });

  readonly filteredProjects = computed(() => {
    const category = this.selectedCategory();
    return category === 'all' 
      ? this.projects 
      : this.projects.filter(p => p.category === category);
  });

  readonly featuredProjects = computed(() => 
    this.projects.filter(p => p.featured)
  );

  readonly projectStats = computed(() => ({
    total: this.projects.length,
    completed: this.projects.filter(p => p.status === 'completed').length,
    inProgress: this.projects.filter(p => p.status === 'in-progress').length,
    planned: this.projects.filter(p => p.status === 'planned').length
  }));

  ngOnInit(): void {
    this.setupScrollAnimation();
    
    // Additional mobile detection and fallback
    this.handleMobileVisibility();
  }

  private handleMobileVisibility(): void {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, set a shorter timeout to ensure visibility
      setTimeout(() => {
        if (!this.isVisible()) {
          this.isVisible.set(true);
        }
      }, 500);
    }
  }

  private setupScrollAnimation(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.isVisible.set(true);
            }
          });
        },
        { 
          threshold: 0.1, // Reduced threshold for mobile
          rootMargin: '50px 0px -50px 0px' // Add margin for better mobile detection
        }
      );

      // Fallback: Set visible after a delay if IntersectionObserver fails
      setTimeout(() => {
        const projectsElement = document.getElementById('projects');
        if (projectsElement) {
          observer.observe(projectsElement);
          
          // Additional fallback for mobile devices
          setTimeout(() => {
            if (!this.isVisible()) {
              this.isVisible.set(true);
            }
          }, 1000);
        }
      }, 100);
    } else {
      // Fallback for browsers without IntersectionObserver
      setTimeout(() => this.isVisible.set(true), 500);
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  openProject(project: Project): void {
    this.selectedProject.set(project);
  }

  closeProject(): void {
    this.selectedProject.set(null);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return '#34c759';
      case 'in-progress': return '#007aff';
      case 'planned': return '#ff9500';
      default: return '#8e8e93';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      default: return 'Unknown';
    }
  }
}