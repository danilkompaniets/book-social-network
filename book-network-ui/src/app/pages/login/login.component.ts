import {Component} from '@angular/core';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {Router, RouterModule} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: "", password: ""}
  errorMsg: Array<String> = []

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {

  }

  login() {
    this.errorMsg = []
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
        next: result => {
          this.tokenService.token = result.token as string;
          this.router.navigate(["books"])
        },
        error: err => {
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg.push(err.error.error)
          }
        }
      },
    )
  }

  register() {
    this.router.navigate(["/register"])
  }
}
