import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EducationItem {
  id: string;
  level: string;
  degree: string;
  institution: string;
  year: string;
  score: string;
  scoreType: 'percentage' | 'cgpa';
  status: 'completed' | 'pursuing' | 'expected';
  description?: string;
  achievements?: string[];
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  // Animation states
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

  // Education data based on Ankit Kumar's actual details
  readonly educationItems: EducationItem[] = [
    {
      id: '1',
      level: 'Post Graduation',
      degree: 'Master of Computer Applications (MCA)',
      institution: 'SPPU (Savitribai Phule Pune University)',
      year: '2025 - 2027',
      score: 'Pursuing',
      scoreType: 'cgpa',
      status: 'pursuing',
      description: 'Advanced studies in computer applications and software development.',
      achievements: [
        'Specializing in advanced software development',
        'Focus on emerging technologies',
        'Research in cloud computing and AI'
      ]
    },
    {
      id: '2',
      level: 'Graduation',
      degree: 'Bachelor of Computer Applications in Cloud Technology (BCA)',
      institution: 'Ajeenkya DY Patil University',
      year: '2022 - 2025',
      score: '9.13',
      scoreType: 'cgpa',
      status: 'completed',
      description: 'Specialized in cloud computing technologies with hands-on experience in modern development practices.',
      achievements: [
        'Excellent academic performance with 9.13 CGPA',
        'Specialized in Cloud Technology',
        'Completed various industry-relevant projects',
        'Strong foundation in programming and software development'
      ]
    },
    {
      id: '3',
      level: 'Higher Secondary',
      degree: 'Class 12th (Science)',
      institution: 'Kendriya Vidyalaya No.2',
      year: '2022',
      score: '70',
      scoreType: 'percentage',
      status: 'completed',
      description: 'Completed higher secondary education with focus on Science stream.',
      achievements: [
        'Strong foundation in Mathematics and Science',
        'Developed analytical and problem-solving skills'
      ]
    },
    {
      id: '4',
      level: 'Secondary',
      degree: 'Class 10th',
      institution: 'Air Force School Viman Nagar',
      year: '2020',
      score: '77',
      scoreType: 'percentage',
      status: 'completed',
      description: 'Completed secondary education with well-rounded academic performance.',
      achievements: [
        'Solid academic foundation',
        'Developed interest in technology and computers'
      ]
    }
  ];

  // Computed properties
  readonly completedEducation = computed(() => 
    this.educationItems.filter(item => item.status === 'completed')
  );

  readonly currentEducation = computed(() => 
    this.educationItems.filter(item => item.status === 'pursuing')
  );

  readonly educationStats = computed(() => ({
    total: this.educationItems.length,
    completed: this.completedEducation().length,
    pursuing: this.currentEducation().length,
    avgScore: this.calculateAverageScore()
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
        const educationElement = document.getElementById('education');
        if (educationElement) {
          observer.observe(educationElement);
          
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

  private calculateAverageScore(): number {
    const completedItems = this.completedEducation().filter(item => 
      item.scoreType === 'percentage' && !isNaN(parseFloat(item.score))
    );
    
    if (completedItems.length === 0) return 0;
    
    const total = completedItems.reduce((sum, item) => 
      sum + parseFloat(item.score), 0
    );
    
    return Math.round(total / completedItems.length);
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completed': return '🎓';
      case 'pursuing': return '📚';
      case 'expected': return '⏳';
      default: return '📖';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return '#34c759';
      case 'pursuing': return '#007aff';
      case 'expected': return '#ff9500';
      default: return '#8e8e93';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pursuing': return 'Pursuing';
      case 'expected': return 'Expected';
      default: return 'Unknown';
    }
  }

  getLevelIcon(level: string): string {
    switch (level.toLowerCase()) {
      case 'post graduation': return '🎯';
      case 'graduation': return '🎓';
      case 'higher secondary': return '📚';
      case 'secondary': return '📖';
      default: return '🎓';
    }
  }
}