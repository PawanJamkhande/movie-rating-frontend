import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  title = 'movie-rating-system-frontend';

  // login/register pages render full-screen with no navbar/sidenav shell around them
  hideShellRoutes = ['/login', '/register'];
  currentUrl = '/login';

  constructor(public authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  get showShell(): boolean {
    return this.authService.isLoggedIn() && !this.hideShellRoutes.includes(this.currentUrl);
  }

}
