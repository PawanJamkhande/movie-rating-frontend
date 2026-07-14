import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css'
})
export class Sidenav {

  constructor(public authService: AuthService) { }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
