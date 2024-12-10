import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/services/authentication.service';
import {Router} from '@angular/router';
import {CodeInputModule} from 'angular-code-input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-activate-account',
  imports: [
    CodeInputModule,
    NgIf
  ],
  templateUrl: './activate-account.component.html',
  standalone: true,
  styleUrls: ['./activate-account.component.scss'] // Corrected property name
})
export class ActivateAccountComponent {
  message: string = "";
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(["/login"]);
  }

  private confirmAccount(token: string) {
    console.log(token);
    this.authService.confirm({
      token: token
    }).subscribe({
      next: () => {
        this.message = "Your account has been successfully activated";
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        console.log(token)
        this.message = "Token has been expired or invalid";
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }
}
