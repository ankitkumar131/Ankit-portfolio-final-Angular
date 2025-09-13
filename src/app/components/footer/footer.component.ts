import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  
  // Newsletter form
  readonly newsletterForm: FormGroup;
  readonly isSubscribing = signal(false);
  readonly subscribeSuccess = signal(false);
  readonly subscribeError = signal('');
  
  readonly personalInfo = {
    name: 'Ankit Kumar',
    title: 'Software Developer at Scalar TechHub',
    email: 'zxankit24@gmail.com',
    location: 'Pune, Maharashtra, India'
  };

  readonly footerSections: FooterSection[] = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Projects',
      links: [
        { name: 'Stock Prediction System', href: '#projects' },
        { name: 'Image Dehazing Tool', href: '#projects' },
        { name: 'Restaurant E-Commerce', href: '#projects' },
        { name: 'Angular Portfolio', href: '#projects' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Resume', href: 'https://drive.google.com/file/d/1DP7VPREwkful0_MmP6hZW3v1TazztzGq/view', external: true },
        { name: 'GitHub', href: 'https://github.com/ankitkumar131', external: true },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ankit-kumar-510387270/', external: true },
        { name: 'Blog', href: '/blog' }
      ]
    }
  ];

  readonly socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ankit-kumar-510387270/',
      icon: '💼'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ankitkumar131',
      icon: '🐱'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/zxankit24',
      icon: '🐦'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ankit_kumar131',
      icon: '📷'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  scrollToSection(anchor: string): void {
    const element = document.getElementById(anchor.replace('#', ''));
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  copyEmail(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.personalInfo.email).then(() => {
        // Could show a toast notification here
        console.log('Email copied to clipboard');
      });
    }
  }

  async subscribeNewsletter(): Promise<void> {
    if (this.newsletterForm.valid) {
      this.isSubscribing.set(true);
      this.subscribeError.set('');

      try {
        // Simulate API call for newsletter subscription
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.subscribeSuccess.set(true);
        this.newsletterForm.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.subscribeSuccess.set(false);
        }, 5000);
        
      } catch (error) {
        this.subscribeError.set('Failed to subscribe. Please try again.');
      } finally {
        this.isSubscribing.set(false);
      }
    } else {
      this.newsletterForm.get('email')?.markAsTouched();
    }
  }

  getEmailError(): string {
    const emailField = this.newsletterForm.get('email');
    if (emailField?.errors && emailField.touched) {
      if (emailField.errors['required']) {
        return 'Email is required';
      }
      if (emailField.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }
}