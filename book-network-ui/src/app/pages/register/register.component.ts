import {Component} from '@angular/core';
import {RegistrationRequest} from '../../services/models/registration-request';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authRequest: RegistrationRequest = {email: "", firstname: "", lastname: "", password: ""}
  errorMsg: Array<String> = []

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  login() {
    this.router.navigate(["/login"])
  }

  register() {
    this.errorMsg = []
    this.authService.register({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.router.navigate(["activate-account"])
      },
      error: err => {
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        }
      }
    })
  }

}
