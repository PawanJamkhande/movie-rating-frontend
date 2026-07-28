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

    localStorage.setItem('theme', this.currentTheme);

  }

  private loadTheme(): void {

    this.currentTheme =
      localStorage.getItem('theme') || 'dark';

  }

  get theme(): string {

    return this.currentTheme;

  }

}
