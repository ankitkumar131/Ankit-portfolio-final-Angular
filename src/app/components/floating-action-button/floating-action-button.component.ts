import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

interface FABAction {
  icon: string;
  label: string;
  action: () => void;
  color: string;
}

@Component({
  selector: 'app-floating-action-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss']
})
export class FloatingActionButtonComponent {
  readonly isExpanded = signal(false);
  readonly isHovered = signal(false);

  constructor(public themeService: ThemeService) {}

  readonly fabActions = computed(() => [
    {
      icon: '🏠',
      label: 'Home',
      action: () => this.scrollToSection('home'),
      color: '#007aff'
    },
    {
      icon: '👨‍💻',
      label: 'About',
      action: () => this.scrollToSection('about'),
      color: '#34c759'
    },
    {
      icon: '🚀',
      label: 'Projects',
      action: () => this.scrollToSection('projects'),
      color: '#ff9500'
    },
    {
      icon: '🎓',
      label: 'Education',
      action: () => this.scrollToSection('education'),
      color: '#af52de'
    },
    {
      icon: '📜',
      label: 'Certifications',
      action: () => this.scrollToSection('certifications'),
      color: '#ff3b30'
    },
    {
      icon: '📞',
      label: 'Contact',
      action: () => this.scrollToSection('contact'),
      color: '#00c7be'
    },
    {
      icon: this.themeService.isDark() ? '☀️' : '🌙',
      label: this.themeService.isDark() ? 'Light Mode' : 'Dark Mode',
      action: () => this.toggleTheme(),
      color: '#8e8e93'
    },
    {
      icon: '🎮',
      label: 'Easter Egg',
      action: () => this.triggerEasterEgg(),
      color: '#ff69b4'
    }
  ]);

  readonly mainIcon = computed(() => {
    return this.isExpanded() ? '✕' : '☰';
  });

  toggleFAB(): void {
    this.isExpanded.update(current => !current);
  }

  closeFAB(): void {
    this.isExpanded.set(false);
  }

  setHovered(hovered: boolean): void {
    this.isHovered.set(hovered);
  }

  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    this.closeFAB();
  }

  private toggleTheme(): void {
    this.themeService.toggleTheme();
    this.closeFAB();
  }

  private triggerEasterEgg(): void {
    // Create confetti effect
    this.createConfetti();
    
    // Show surprise message
    const message = document.createElement('div');
    message.innerHTML = '🎉 You found the easter egg! Keep exploring! 🚀';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ff69b4, #00c7be);
      color: white;
      padding: 20px 30px;
      border-radius: 15px;
      font-size: 1.2rem;
      font-weight: 600;
      box-shadow: 0 8px 30px rgba(255, 105, 180, 0.3);
      z-index: 10000;
      animation: easterEggPop 0.5s ease-out;
      text-align: center;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
    `;
    
    document.body.appendChild(message);
    
    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes easterEggPop {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
        80% {
          transform: translate(-50%, -50%) scale(1.1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      if (document.body.contains(message)) {
        document.body.removeChild(message);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }, 3000);
    
    this.closeFAB();
  }

  private createConfetti(): void {
    const colors = ['#ff69b4', '#00c7be', '#ff9500', '#34c759', '#007aff', '#af52de'];
    const confettiCount = 50;
    
    // Add confetti styles
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
      .confetti-particle {
        position: fixed;
        width: 10px;
        height: 10px;
        top: -10px;
        z-index: 9999;
        animation: confettiFall linear forwards;
        border-radius: 2px;
      }
      
      @keyframes confettiFall {
        to {
          transform: translateY(100vh) rotate(720deg);
        }
      }
    `;
    document.head.appendChild(confettiStyle);
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random().toString();
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          if (document.body.contains(confetti)) {
            document.body.removeChild(confetti);
          }
        }, 5000);
      }, i * 50);
    }
    
    // Clean up styles after animation
    setTimeout(() => {
      if (document.head.contains(confettiStyle)) {
        document.head.removeChild(confettiStyle);
      }
    }, 8000);
  }
}