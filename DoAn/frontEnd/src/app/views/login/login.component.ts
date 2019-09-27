import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('userNameField', {static: false}) userNameField: ElementRef;
  message: string = '';
  userName: string;
  password: string;
  constructor(private userService: UserService, private authService: AuthService,
    private cookieService: CookieService, private router: Router) {}
  ngAfterViewInit() {
    this.userNameField.nativeElement.focus();
  }
  login() {
    this.userService.login(this.userName, this.password).subscribe( res => {
      if (res.errorCode === 0) {
        this.message = '';
        // save user info, then redirect to dashboard
        this.cookieService.set('userInfo', JSON.stringify(res.data));
        this.cookieService.set('token', res.data.token);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/dashboard']);
      } else {
        this.message = res.message;
      }
    });
  }
}
