import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme = 'dark';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {

    this.currentTheme =
      this.currentTheme === 'dark'
        ? 'light'
        : 'dark';

    this.applyTheme();

  }

  private applyTheme(): void {

    document.body.classList.remove('dark-theme', 'light-theme');

    document.body.classList.add(`${this.currentTheme}-theme`);

    localStorage.setItem('theme', this.currentTheme);

  }

  private loadTheme(): void {

    this.currentTheme =
      localStorage.getItem('theme') || 'dark';

    this.applyTheme();

  }

  get theme(): string {
    return this.currentTheme;
  }

}
