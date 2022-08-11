import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/Models/login-user';
import IUser from 'src/app/Models/user.model';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLogged = false;
  isRegisterFail = false;
  isSubmitted = false;
  errorMsj!: string;

  registerForm: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private database: DatabaseService,
    private auth: AuthUserService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      puesto: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      imgHero: [''],
      imgPerfil: [''],
      sobreMi: ['', [Validators.required]],
      link1: [''],
      link2: [''],
    });
  }

  ngOnInit(): void {
    if (this.auth.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  register(e: Event) {
    e.preventDefault();

    const {
      email,
      password,
      puesto,
      nombre,
      imgHero,
      imgPerfil,
      sobreMi,
      link1,
      link2,
    } = this.registerForm.value;
    const newUser: IUser = {
      nombre: nombre,
      password: password,
      email: email,
      img_hero: imgHero,
      img_perfil: imgPerfil,
      puesto: puesto,
      sobre_mi: sobreMi,
      link_1: link1,
      link_2: link2,
    };

    this.auth.createNewUser(newUser).subscribe({
      next: (data) => {
        console.log(data);
        this.isRegisterFail = false;
        const login = new LoginUser(email, password);
        this.auth.login(login).subscribe((token) => {
          this.auth.setToken(token.token);
          this.router.navigate([`/portfolio/${email}`]);
        });
      },
      error: (err) => {
        this.isRegisterFail = true;
        this.isSubmitted = true;
        this.errorMsj = err.error;
        console.log(err);
      },
    });
  }
}
