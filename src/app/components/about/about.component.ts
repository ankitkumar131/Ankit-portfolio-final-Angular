import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  // Animation state
  readonly isVisible = signal(false);

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

  // Personal information (will be populated from resume)
  readonly aboutInfo = {
    title: 'About Me',
    subtitle: 'Get to know me better',
    description: `I'm a passionate Software Developer currently working at Scalar TechHub with expertise in 
    cloud technologies and full-stack development. I specialize in creating robust, scalable web 
    applications using modern technologies like Angular, Python, TypeScript, and various cloud platforms. 
    My experience spans from complex image processing applications to e-commerce platforms and financial tools.`,
    
    highlights: [
      'Software Developer at Scalar TechHub with hands-on industry experience',
      'Expertise in Angular, Python, TypeScript, and cloud technologies',
      'Built diverse projects: ML stock prediction, image processing, e-commerce platforms',
      'Strong focus on clean code, technical innovation, and continuous learning'
    ],

    experience: {
      years: 'Current',
      projects: '15+',
      clients: 'Scalar TechHub',
      technologies: '25+'
    },

    values: [
      {
        title: 'Innovation',
        description: 'Always exploring new technologies and methodologies to deliver cutting-edge solutions.',
        icon: '💡'
      },
      {
        title: 'Quality',
        description: 'Committed to writing clean, maintainable code that stands the test of time.',
        icon: '⭐'
      },
      {
        title: 'Collaboration',
        description: 'Believe in the power of teamwork and open communication to achieve great results.',
        icon: '🤝'
      },
      {
        title: 'Growth',
        description: 'Continuously learning and adapting to stay current with industry trends.',
        icon: '📈'
      }
    ]
  };

  // Computed properties for animations
  readonly animationClasses = computed(() => ({
    'about--visible': this.isVisible()
  }));

  ngOnInit(): void {
    // Intersection Observer for scroll animations
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
        const aboutElement = document.getElementById('about');
        if (aboutElement) {
          observer.observe(aboutElement);
          
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

  downloadResume(): void {
    // Open resume in new tab
    window.open('https://drive.google.com/file/d/1DP7VPREwkful0_MmP6hZW3v1TazztzGq/view', '_blank', 'noopener,noreferrer');
  }
}