import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { DbService } from "../services/db.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild("email2") email2: ElementRef;
  @ViewChild("password2") password2: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private dbService: DbService
  ) {}
  formNo = 1;
  active = null;

  ngOnInit(): void {}

  changeState() {
    this.active = true;
  }

  //Login method login(email.value, password.value)
  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        this.changeState();
        setTimeout(() => {
          localStorage.setItem("token", "true");
          this.router.navigate(["home/dashboard"]);
          this.fireAuth.onAuthStateChanged((user) => {
            if (user) {
              localStorage.setItem("userUID", user.uid);
              this.dbService.retrieveMemories();
              this.dbService.retrieveViewedMemories();
            }
          });
        }, 250);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(["/login"]);
      }
    );
    this.email.nativeElement.value = "";
    this.password.nativeElement.value = "";
  }

  loginWithout() {
    this.changeState();
    setTimeout(() => {
      this.router.navigateByUrl("home/dashboard");
    }, 250);
  }

  //RegisterUser Method
  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert("Registration Successful");
        this.formNo = 1;
      },
      (err) => {
        alert(err.message);
      }
    );
    this.email2.nativeElement.value = "";
    this.password2.nativeElement.value = "";
  }

  changeForm() {
    if (this.formNo === 1) {
      this.formNo = 2;
    } else if (this.formNo === 2) {
      this.formNo = 1;
    }
  }

  login1() {
    this.router.navigate(["home/dashboard"]);
  }
}
