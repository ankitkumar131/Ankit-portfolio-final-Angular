import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  // Animation states
  readonly isVisible = signal(false);
  readonly isSubmitting = signal(false);
  readonly submitSuccess = signal(false);
  readonly submitError = signal('');
  readonly showToast = signal(false);
  readonly toastMessage = signal('');

  // Contact form
  contactForm: FormGroup;

  // Contact information - Updated with actual details
  readonly contactInfo: ContactInfo = {
    email: 'zxankit24@gmail.com',
    phone: '+91 7385356862',
    location: 'Pune, Maharashtra, India',
    availability: 'Currently working at Scalar TechHub'
  };

  // Social media links - Updated with actual URLs
  readonly socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ankit-kumar-510387270/',
      icon: '💼',
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ankitkumar131',
      icon: '🐱',
      color: '#333'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/zxankit24',
      icon: '🐦',
      color: '#1da1f2'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ankit_kumar131',
      icon: '📷',
      color: '#e4405f'
    },
    {
      name: 'Resume',
      url: 'https://drive.google.com/file/d/1DP7VPREwkful0_MmP6hZW3v1TazztzGq/view',
      icon: '📄',
      color: '#ff9500'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
    
    // Check if we're on mobile and set immediate visibility
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // Set immediate visibility for mobile to prevent loading issues
        setTimeout(() => this.isVisible.set(true), 100);
      }
    }
  }

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
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          observer.observe(contactElement);
          
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

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.submitError.set('');

      try {
        // Simulate API call
        await this.simulateFormSubmission();
        
        this.submitSuccess.set(true);
        this.contactForm.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess.set(false);
        }, 5000);
        
      } catch (error) {
        this.submitError.set('Failed to send message. Please try again.');
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private async simulateFormSubmission(): Promise<void> {
    // Simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Network error'));
        }
      }, 2000);
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.capitalizeFirst(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `${this.capitalizeFirst(fieldName)} must be at least ${minLength} characters`;
      }
    }
    return '';
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  copyToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast.set(true);
        this.toastMessage.set('Email copied to clipboard! 📋');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
          this.showToast.set(false);
        }, 3000);
      }).catch(() => {
        this.showToast.set(true);
        this.toastMessage.set('Failed to copy email. Please try again.');
        
        setTimeout(() => {
          this.showToast.set(false);
        }, 3000);
      });
    } else {
      // Fallback for older browsers
      this.showToast.set(true);
      this.toastMessage.set('Copy not supported. Email: ' + text);
      
      setTimeout(() => {
        this.showToast.set(false);
      }, 4000);
    }
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}