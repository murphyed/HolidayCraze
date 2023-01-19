import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('token')!);
    return user !== null;
  }

  //Logout user
  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
