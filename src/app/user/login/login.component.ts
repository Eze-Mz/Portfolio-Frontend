import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/Models/login-user';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  isSubmitted = false;
  loginUser!: LoginUser;
  errorMsj!: string;

  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthUserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    if (this.auth.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
  }

  public get Email() {
    return this.loginForm.get('email');
  }

  public get Password() {
    return this.loginForm.get('password');
  }

  async login(event: Event) {
    event.preventDefault;
    this.loginUser = new LoginUser(this.Email?.value, this.Password?.value);
    await this.auth.login(this.loginUser).subscribe({
      next: (data) => {
        this.isLogged = true;
        this.isLoginFail = false;
        this.auth.setToken(data.token);
        this.router.navigate([`/portfolio/${this.Email?.value}`]);
      },
      error: (error) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.isSubmitted = true;
        this.errorMsj = 'Revise sus credenciales';
      },
    });
  }
}
