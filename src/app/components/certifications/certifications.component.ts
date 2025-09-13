import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  credentialUrl?: string;
  issueDate: string;
  expiryDate?: string;
  skills: string[];
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  verified: boolean;
  credentialId?: string;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit {
  // Animation states
  readonly isVisible = signal(true);
  readonly selectedCategory = signal<string>('all');

  // Certifications data - Updated with Ankit Kumar's actual certifications
  readonly certifications: Certification[] = [
    {
      id: '1',
      name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      issuer: 'Oracle',
      description: 'Comprehensive certification covering AI foundations, machine learning concepts, and Oracle Cloud Infrastructure AI services. Demonstrates understanding of AI/ML principles and practical implementation on OCI platform.',
      credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=47652026AEDC50C802DACCC90E59194D7144698360590C0D69D42596D887628E',
      issueDate: '2025-01-01',
      skills: ['Oracle Cloud Infrastructure', 'AI Foundations', 'Machine Learning', 'Cloud AI Services', 'OCI Platform'],
      category: 'Cloud Computing',
      level: 'Intermediate',
      verified: true,
      credentialId: 'OCI-AI-2025-001'
    },
    {
      id: '2',
      name: 'Scaling with Google Cloud Operations',
      issuer: 'Google Cloud',
      description: 'Advanced certification focusing on scaling cloud operations, monitoring, logging, and performance optimization. Covers operational excellence and reliability engineering practices on Google Cloud Platform.',
      credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e99dcbe5-61e9-492b-a0eb-5a0ce0de87c7/badges/6205010',
      issueDate: '2024-08-15',
      skills: ['Google Cloud Platform', 'Cloud Operations', 'Monitoring', 'Logging', 'Performance Optimization', 'Reliability Engineering'],
      category: 'Cloud Computing',
      level: 'Advanced',
      verified: true,
      credentialId: 'GCP-OPS-2024-002'
    },
    {
      id: '3',
      name: 'Modernize Infrastructure and Applications with Google Cloud',
      issuer: 'Google Cloud',
      description: 'Certification covering cloud migration strategies, application modernization, and infrastructure transformation using Google Cloud services and best practices.',
      credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e99dcbe5-61e9-492b-a0eb-5a0ce0de87c7/badges/6204539',
      issueDate: '2024-08-10',
      skills: ['Google Cloud Platform', 'Infrastructure Modernization', 'Application Migration', 'Cloud Architecture', 'DevOps'],
      category: 'Cloud Computing',
      level: 'Advanced',
      verified: true,
      credentialId: 'GCP-MOD-2024-003'
    },
    {
      id: '4',
      name: 'Streaming Analytics into BigQuery',
      issuer: 'Google Cloud',
      description: 'Specialized certification in real-time data streaming and analytics using BigQuery. Covers data pipeline design, stream processing, and analytical query optimization.',
      credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e99dcbe5-61e9-492b-a0eb-5a0ce0de87c7/badges/4893660',
      issueDate: '2024-06-20',
      skills: ['BigQuery', 'Streaming Analytics', 'Data Pipeline', 'Real-time Processing', 'SQL', 'Data Engineering'],
      category: 'Data Science',
      level: 'Advanced',
      verified: true,
      credentialId: 'GCP-BQ-2024-004'
    },
    {
      id: '5',
      name: 'Deploy Kubernetes Applications on Google Cloud',
      issuer: 'Google Cloud',
      description: 'Comprehensive certification for container orchestration using Kubernetes on Google Cloud Platform. Covers deployment strategies, scaling, and production-ready configurations.',
      credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e99dcbe5-61e9-492b-a0eb-5a0ce0de87c7/badges/4858349',
      issueDate: '2024-06-15',
      skills: ['Kubernetes', 'Google Kubernetes Engine', 'Container Orchestration', 'DevOps', 'Cloud Native', 'Docker'],
      category: 'DevOps',
      level: 'Advanced',
      verified: true,
      credentialId: 'GCP-K8S-2024-005'
    },
    {
      id: '6',
      name: 'Configure Service Accounts and IAM Roles for Google Cloud',
      issuer: 'Google Cloud',
      description: 'Security-focused certification covering identity and access management, service account configuration, and security best practices on Google Cloud Platform.',
      credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e99dcbe5-61e9-492b-a0eb-5a0ce0de87c7/badges/4855999',
      issueDate: '2024-06-12',
      skills: ['Google Cloud IAM', 'Service Accounts', 'Cloud Security', 'Access Management', 'Security Best Practices'],
      category: 'Cloud Computing',
      level: 'Intermediate',
      verified: true,
      credentialId: 'GCP-IAM-2024-006'
    },
    {
      id: '7',
      name: 'Use APIs to Work with Cloud Storage',
      issuer: 'Google Cloud',
      description: 'API-focused certification demonstrating proficiency in programmatic interaction with Google Cloud Storage services using various APIs and SDKs.',
      credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e99dcbe5-61e9-492b-a0eb-5a0ce0de87c7/badges/4836932',
      issueDate: '2024-06-08',
      skills: ['Google Cloud Storage', 'Cloud APIs', 'SDK Integration', 'RESTful APIs', 'Cloud Development'],
      category: 'Development Tools',
      level: 'Intermediate',
      verified: true,
      credentialId: 'GCP-API-2024-007'
    },
    {
      id: '8',
      name: 'Google Cloud Skills Boost Profile',
      issuer: 'Google Cloud',
      description: 'Comprehensive skills profile showcasing multiple Google Cloud skill badges and hands-on laboratory completions across various cloud technologies and services.',
      credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/0f269c1f-ffc0-441d-812a-2e4b28621311',
      issueDate: '2024-06-01',
      skills: ['Google Cloud Platform', 'Multi-skill Competency', 'Hands-on Labs', 'Cloud Technologies', 'Continuous Learning'],
      category: 'Cloud Computing',
      level: 'Expert',
      verified: true,
      credentialId: 'GCP-PROFILE-2024-008'
    }
  ];

  // Computed properties
  readonly categories = computed(() => {
    const cats = ['all', ...new Set(this.certifications.map(c => c.category))];
    return cats.map(cat => ({
      name: cat === 'all' ? 'All Certifications' : cat,
      value: cat,
      count: cat === 'all' ? this.certifications.length : this.certifications.filter(c => c.category === cat).length
    }));
  });

  readonly filteredCertifications = computed(() => {
    const category = this.selectedCategory();
    return category === 'all' 
      ? this.certifications 
      : this.certifications.filter(c => c.category === category);
  });

  readonly certificationStats = computed(() => ({
    total: this.certifications.length,
    verified: this.certifications.filter(c => c.verified).length,
    categories: new Set(this.certifications.map(c => c.category)).size,
    latestYear: Math.max(...this.certifications.map(c => new Date(c.issueDate).getFullYear()))
  }));

  readonly skillCloud = computed(() => {
    const skillCount = new Map<string, number>();
    this.certifications.forEach(cert => {
      cert.skills.forEach(skill => {
        skillCount.set(skill, (skillCount.get(skill) || 0) + 1);
      });
    });
    
    return Array.from(skillCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([skill, count]) => ({ skill, count }));
  });

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
            }
          });
        },
        { threshold: 0.2 }
      );

      const certificationsElement = document.getElementById('certifications');
      if (certificationsElement) {
        observer.observe(certificationsElement);
      }
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  getLevelColor(level: string): string {
    switch (level) {
      case 'Beginner': return '#34c759';
      case 'Intermediate': return '#007aff';
      case 'Advanced': return '#ff9500';
      case 'Expert': return '#ff3b30';
      default: return '#8e8e93';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Cloud Computing': return '☁️';
      case 'Web Development': return '🌐';
      case 'Data Science': return '📊';
      case 'DevOps': return '🔧';
      case 'Development Tools': return '🛠️';
      default: return '📜';
    }
  }

  openCredential(url: string): void {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  isExpired(expiryDate?: string): boolean {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
}