import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Theme state
  private readonly currentTheme = signal<Theme>('light');
  
  // Public computed properties
  readonly theme = computed(() => this.currentTheme());
  readonly isDark = computed(() => this.currentTheme() === 'dark');
  readonly isLight = computed(() => this.currentTheme() === 'light');
  
  constructor() {
    // Load theme from localStorage on initialization
    this.loadThemeFromStorage();
    
    // Apply theme changes to DOM
    effect(() => {
      this.applyThemeToDOM(this.currentTheme());
    });
  }
  
  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  /**
   * Set specific theme
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.saveThemeToStorage(theme);
  }
  
  /**
   * Load theme from localStorage or detect system preference
   */
  private loadThemeFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.currentTheme.set(savedTheme);
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme.set(prefersDark ? 'dark' : 'light');
    }
  }
  
  /**
   * Save theme to localStorage
   */
  private saveThemeToStorage(theme: Theme): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('portfolio-theme', theme);
  }
  
  /**
   * Apply theme to DOM by adding/removing classes
   */
  private applyThemeToDOM(theme: Theme): void {
    if (typeof document === 'undefined') return;
    
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('light-theme', 'dark-theme');
    
    // Add new theme class
    body.classList.add(`${theme}-theme`);
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
  }
  
  /**
   * Update meta theme-color for mobile browsers
   */
  private updateMetaThemeColor(theme: Theme): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const color = theme === 'dark' ? '#1d1d1f' : '#ffffff';
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      // Create meta tag if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }
}