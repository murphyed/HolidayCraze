import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  introGreet = 'Welcome';
  logoutButtonState = null;
  arrayDisplay = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('position') === null) {
      sessionStorage.setItem('position', '1');
      this.position = 1;
    }
  }

  ngAfterViewInit() {}

  position = Number(sessionStorage.getItem('position'));
  changeState() {
    if (this.logoutButtonState === null) {
      this.logoutButtonState = false;
    }
    this.logoutButtonState = !this.logoutButtonState;
    if (this.logoutButtonState === false) {
      setTimeout(() => {
        this.introGreet = 'Welcome';
      }, 600);
    } else {
      setTimeout(() => {
        this.introGreet = 'Goodbye';
      }, 600);
    }
  }

  changePosition1() {
    this.position = 1;
    sessionStorage.setItem('position', '1');
  }
  changePosition2() {
    this.position = 2;
    sessionStorage.setItem('position', '2');
  }
  changePosition3() {
    this.position = 3;
    sessionStorage.setItem('position', '3');
  }

  logout() {
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('userUID');
    this.authService.logout();
  }
}
