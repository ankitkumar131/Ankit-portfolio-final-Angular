import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  description: string;
  yearsOfExperience: number;
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  // Animation states
  readonly isVisible = signal(false);
  readonly selectedCategory = signal<string>('all');
  readonly expandedSkills = signal<Set<string>>(new Set());
  readonly hoveredSkill = signal<string | null>(null);

  // Skills data (this will be populated from resume/backend)
  readonly skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      icon: '🎨',
      color: '#007aff',
      skills: [
        {
          name: 'Angular',
          level: 95,
          category: 'Frontend',
          icon: '🅰️',
          description: 'Expert in Angular 15+ with deep knowledge of components, services, and routing',
          yearsOfExperience: 3
        },
        {
          name: 'React',
          level: 88,
          category: 'Frontend',
          icon: '⚛️',
          description: 'Proficient in React with hooks, context API, and modern patterns',
          yearsOfExperience: 2
        },
        {
          name: 'TypeScript',
          level: 92,
          category: 'Frontend',
          icon: '📘',
          description: 'Strong typing skills with advanced TypeScript features',
          yearsOfExperience: 3
        },
        {
          name: 'JavaScript',
          level: 90,
          category: 'Frontend',
          icon: '📜',
          description: 'Solid ES6+ knowledge with modern JavaScript patterns',
          yearsOfExperience: 4
        },
        {
          name: 'HTML5/CSS3',
          level: 94,
          category: 'Frontend',
          icon: '🎨',
          description: 'Semantic HTML and modern CSS with animations and responsive design',
          yearsOfExperience: 4
        },
        {
          name: 'SCSS/Sass',
          level: 87,
          category: 'Frontend',
          icon: '💅',
          description: 'Advanced CSS preprocessing with mixins and functions',
          yearsOfExperience: 3
        }
      ]
    },
    {
      name: 'Backend',
      icon: '⚙️',
      color: '#34c759',
      skills: [
        {
          name: 'Node.js',
          level: 85,
          category: 'Backend',
          icon: '💚',
          description: 'Server-side JavaScript with Express.js and modern frameworks',
          yearsOfExperience: 2
        },
        {
          name: 'Python',
          level: 80,
          category: 'Backend',
          icon: '🐍',
          description: 'Web development with Django/Flask and automation scripts',
          yearsOfExperience: 2
        },
        {
          name: 'Java',
          level: 75,
          category: 'Backend',
          icon: '☕',
          description: 'Spring Boot applications and enterprise development',
          yearsOfExperience: 1
        },
        {
          name: 'REST APIs',
          level: 90,
          category: 'Backend',
          icon: '🔌',
          description: 'Design and implementation of RESTful web services',
          yearsOfExperience: 3
        }
      ]
    },
    {
      name: 'Database',
      icon: '🗄️',
      color: '#ff9500',
      skills: [
        {
          name: 'MongoDB',
          level: 83,
          category: 'Database',
          icon: '🍃',
          description: 'NoSQL database design and aggregation pipelines',
          yearsOfExperience: 2
        },
        {
          name: 'PostgreSQL',
          level: 78,
          category: 'Database',
          icon: '🐘',
          description: 'Relational database design and complex queries',
          yearsOfExperience: 2
        },
        {
          name: 'MySQL',
          level: 80,
          category: 'Database',
          icon: '🐬',
          description: 'Database optimization and performance tuning',
          yearsOfExperience: 2
        }
      ]
    },
    {
      name: 'Tools & Others',
      icon: '🛠️',
      color: '#5856d6',
      skills: [
        {
          name: 'Git',
          level: 90,
          category: 'Tools',
          icon: '🌿',
          description: 'Version control with advanced branching strategies',
          yearsOfExperience: 4
        },
        {
          name: 'Docker',
          level: 75,
          category: 'Tools',
          icon: '🐳',
          description: 'Containerization and deployment automation',
          yearsOfExperience: 1
        },
        {
          name: 'AWS',
          level: 70,
          category: 'Tools',
          icon: '☁️',
          description: 'Cloud services and serverless architecture',
          yearsOfExperience: 1
        },
        {
          name: 'Jest/Jasmine',
          level: 82,
          category: 'Tools',
          icon: '🧪',
          description: 'Unit testing and test-driven development',
          yearsOfExperience: 2
        }
      ]
    }
  ];

  // Computed properties
  readonly filteredSkills = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.skillCategories.flatMap(cat => cat.skills);
    }
    return this.skillCategories
      .find(cat => cat.name.toLowerCase() === category.toLowerCase())?.skills || [];
  });

  readonly categoryOptions = computed(() => [
    { name: 'All Skills', value: 'all', icon: '🎯' },
    ...this.skillCategories.map(cat => ({
      name: cat.name,
      value: cat.name.toLowerCase(),
      icon: cat.icon
    }))
  ]);

  readonly totalSkills = computed(() => 
    this.skillCategories.flatMap(cat => cat.skills).length
  );

  readonly totalCategories = computed(() => 
    this.skillCategories.length
  );

  readonly averageProficiency = computed(() => {
    const allSkills = this.skillCategories.flatMap(cat => cat.skills);
    const total = allSkills.reduce((acc, skill) => acc + skill.level, 0);
    return Math.round(total / allSkills.length);
  });

  readonly expertSkills = computed(() => 
    this.skillCategories.flatMap(cat => cat.skills).filter(skill => skill.level >= 90).length
  );

  ngOnInit(): void {
    this.setupScrollAnimation();
  }

  private setupScrollAnimation(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.isVisible.set(true);
              this.animateSkillBars();
            }
          });
        },
        { threshold: 0.2 }
      );

      const skillsElement = document.getElementById('skills');
      if (skillsElement) {
        observer.observe(skillsElement);
      }
    }
  }

  private animateSkillBars(): void {
    setTimeout(() => {
      const skillBars = document.querySelectorAll('.skill__progress-fill');
      skillBars.forEach((bar, index) => {
        setTimeout(() => {
          bar.classList.add('animate');
        }, index * 100);
      });
    }, 500);
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  toggleSkillExpansion(skillName: string): void {
    const expanded = this.expandedSkills();
    const newExpanded = new Set(expanded);
    
    if (newExpanded.has(skillName)) {
      newExpanded.delete(skillName);
    } else {
      newExpanded.add(skillName);
    }
    
    this.expandedSkills.set(newExpanded);
  }

  setHoveredSkill(skillName: string | null): void {
    this.hoveredSkill.set(skillName);
  }

  isSkillExpanded(skillName: string): boolean {
    return this.expandedSkills().has(skillName);
  }

  isSkillHovered(skillName: string): boolean {
    return this.hoveredSkill() === skillName;
  }

  getSkillCapabilities(skillName: string): string[] {
    const capabilities: Record<string, string[]> = {
      'TypeScript': [
        'Build type-safe applications with strong typing',
        'Create reusable interfaces and generics',
        'Implement advanced OOP patterns',
        'Integrate with modern frameworks'
      ],
      'Angular': [
        'Develop scalable single-page applications',
        'Create reusable components and services',
        'Implement reactive programming with RxJS',
        'Build Progressive Web Apps (PWAs)'
      ],
      'React': [
        'Build interactive user interfaces',
        'Manage application state with Redux/Context',
        'Create custom hooks and components',
        'Implement server-side rendering'
      ],
      'Node.js': [
        'Build RESTful APIs and microservices',
        'Handle real-time applications with Socket.io',
        'Implement authentication and authorization',
        'Create CLI tools and automation scripts'
      ],
      'Python': [
        'Develop machine learning models',
        'Build web applications with Django/Flask',
        'Create data analysis and visualization',
        'Automate tasks and scripting'
      ],
      'Java': [
        'Build enterprise applications',
        'Develop Spring Boot microservices',
        'Create Android applications',
        'Implement design patterns and best practices'
      ]
    };
    
    return capabilities[skillName] || [
      'Professional development and implementation',
      'Code optimization and best practices',
      'Problem-solving and debugging',
      'Integration with other technologies'
    ];
  }

  getRelatedProjects(skillName: string): string[] {
    const projects: Record<string, string[]> = {
      'TypeScript': ['Angular Portfolio', 'React Dashboard', 'Node.js API'],
      'Angular': ['Portfolio Website', 'E-commerce Platform', 'Admin Dashboard'],
      'React': ['Interactive Dashboard', 'Social Media App', 'Chat Application'],
      'Node.js': ['REST API Server', 'Real-time Chat', 'Microservices'],
      'Python': ['Stock Prediction System', 'Image Dehazing Tool', 'Data Analysis'],
      'Java': ['Spring Boot API', 'Android App', 'Desktop Application']
    };
    
    return projects[skillName] || ['Various Projects', 'Personal Experiments'];
  }

  getStartYear(yearsOfExperience: number): string {
    const currentYear = new Date().getFullYear();
    return (currentYear - yearsOfExperience).toString();
  }

  getSkillLevelText(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    if (level >= 60) return 'Basic';
    return 'Beginner';
  }

  getCategoryColor(skillName: string): string {
    const skill = this.skillCategories
      .flatMap(cat => cat.skills)
      .find(s => s.name === skillName);
    
    const category = this.skillCategories
      .find(cat => cat.skills.includes(skill!));
    
    return category?.color || '#007aff';
  }
}