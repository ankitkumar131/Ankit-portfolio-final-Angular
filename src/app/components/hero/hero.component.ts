import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  // Personal information - Updated with actual details
  readonly personalInfo = {
    name: 'Ankit Kumar',
    title: 'Software Developer',
    subtitle: 'Currently working at Scalar TechHub | Cloud Enthusiast | Full Stack Developer',
    location: 'Pune, Maharashtra, India',
    availability: 'Software Developer at Scalar TechHub',
    company: 'Scalar TechHub',
    role: 'Software Developer'
  };

  // Animated text for typewriter effect
  private readonly typedText = signal('');
  private readonly currentTitleIndex = signal(0);
  readonly isTyping = signal(false);
  private readonly currentWord = signal('');
  readonly showCursor = signal(true);
  
  readonly titles = [
    { text: 'Software Developer', emoji: '💻', color: '#007aff' },
    { text: 'Cloud Enthusiast', emoji: '☁️', color: '#34c759' },
    { text: 'Full Stack Developer', emoji: '🚀', color: '#ff9500' },
    { text: 'Frontend Specialist', emoji: '🎨', color: '#af52de' },
    { text: 'Backend Engineer', emoji: '⚙️', color: '#ff3b30' },
    { text: 'Angular Expert', emoji: '🅰️', color: '#dd0031' },
    { text: 'Python Developer', emoji: '🐍', color: '#306998' },
    { text: 'React Developer', emoji: '⚛️', color: '#61dafb' },
    { text: 'Innovation Seeker', emoji: '💡', color: '#ffcc02' },
    { text: 'Problem Solver', emoji: '🧩', color: '#00c7be' }
  ];

  readonly displayedTitle = computed(() => this.typedText());
  readonly currentTitleData = computed(() => this.titles[this.currentTitleIndex()]);
  readonly typingIndicator = computed(() => this.isTyping() ? '|' : '');
  
  // Interactive elements
  readonly mousePosition = signal({ x: 0, y: 0 });
  readonly isMouseOverHero = signal(false);
  readonly clickCount = signal(0);
  readonly showEasterEgg = computed(() => this.clickCount() >= 5);

  // Animation states
  readonly isVisible = signal(false);

  ngOnInit(): void {
    // Trigger entrance animations
    setTimeout(() => {
      this.isVisible.set(true);
    }, 100);

    // Start typewriter effect
    this.startTypewriterEffect();
    
    // Start cursor blinking
    this.startCursorBlink();
    
    // Setup mouse tracking
    this.setupMouseTracking();
  }

  private startTypewriterEffect(): void {
    const typeSpeed = 120;
    const deleteSpeed = 80;
    const pauseDuration = 3000;
    const deleteDelay = 1500;

    const typeTitle = (title: string, charIndex: number = 0): void => {
      this.isTyping.set(true);
      if (charIndex < title.length) {
        this.typedText.update(current => current + title[charIndex]);
        setTimeout(() => typeTitle(title, charIndex + 1), typeSpeed + Math.random() * 50);
      } else {
        this.isTyping.set(false);
        setTimeout(() => deleteTitle(title.length), pauseDuration);
      }
    };

    const deleteTitle = (charIndex: number): void => {
      this.isTyping.set(true);
      if (charIndex > 0) {
        this.typedText.update(current => current.slice(0, -1));
        setTimeout(() => deleteTitle(charIndex - 1), deleteSpeed);
      } else {
        this.isTyping.set(false);
        this.currentTitleIndex.update(current => 
          (current + 1) % this.titles.length
        );
        setTimeout(() => {
          const nextTitle = this.titles[this.currentTitleIndex()];
          typeTitle(nextTitle.text);
        }, deleteDelay);
      }
    };

    // Start the animation
    typeTitle(this.titles[0].text);
  }
  
  private startCursorBlink(): void {
    setInterval(() => {
      this.showCursor.update(current => !current);
    }, 530);
  }
  
  private setupMouseTracking(): void {
    if (typeof window !== 'undefined') {
      document.addEventListener('mousemove', (e) => {
        this.mousePosition.set({ x: e.clientX, y: e.clientY });
      });
    }
  }
  
  onHeroMouseEnter(): void {
    this.isMouseOverHero.set(true);
  }
  
  onHeroMouseLeave(): void {
    this.isMouseOverHero.set(false);
  }
  
  onNameClick(): void {
    this.clickCount.update(count => count + 1);
    
    if (this.clickCount() === 5) {
      this.triggerNameEasterEgg();
    }
  }
  
  private triggerNameEasterEgg(): void {
    // Create floating emojis
    const emojis = ['🎉', '🚀', '✨', '🌈', '🎆', '🌈'];
    
    emojis.forEach((emoji, index) => {
      setTimeout(() => {
        this.createFloatingEmoji(emoji);
      }, index * 200);
    });
    
    // Reset click count after animation
    setTimeout(() => {
      this.clickCount.set(0);
    }, 3000);
  }
  
  private createFloatingEmoji(emoji: string): void {
    const emojiElement = document.createElement('div');
    emojiElement.textContent = emoji;
    emojiElement.className = 'floating-emoji';
    emojiElement.style.left = Math.random() * window.innerWidth + 'px';
    emojiElement.style.top = window.innerHeight + 'px';
    document.body.appendChild(emojiElement);
    
    setTimeout(() => {
      document.body.removeChild(emojiElement);
    }, 4000);
  }

  scrollToProjects(): void {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  downloadResume(): void {
    // Open resume URL in new tab
    window.open('https://drive.google.com/file/d/1DP7VPREwkful0_MmP6hZW3v1TazztzGq/view', '_blank', 'noopener,noreferrer');
  }
}