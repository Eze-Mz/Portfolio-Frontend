import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import IUser from '../Models/user.model';

const TOKEN_KEY = 'currentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  apiUrl = 'https://git.heroku.com/warm-gorge-04744.git:8080/auth/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {
    //! Si hago esto, aunque cierre sesión y vuelva a iniciar la instancia del servicio es la misma, por lo que el constructor no vuelve a utilizarse y queda almacenado en la variable el token anterior
    /* this.token = this.getToken()
      ? JSON.parse(atob(this.getToken().split('.')[1]))
      : ''; */
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(this.apiUrl, credenciales);
  }

  createNewUser(newUser: IUser): Observable<any> {
    const url = `https://git.heroku.com/warm-gorge-04744.git:8080/auth/register`;
    return this.http.post(url, newUser, this.httpOptions);
  }

  //Sería bueno comprobar que el token es correcto antes de guardarlo
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) ?? '';
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public getUserId(): number {
    if (!this.isLogged()) {
      return 0;
    }
    //The atob() function decodes a string of data which has been encoded using Base64 encoding.
    //See: https://developer.mozilla.org/en-US/docs/Web/API/atob
    const token = this.getToken();
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const values = JSON.parse(decodedPayload);
    return values.userId;
  }

  public getUserEmail(): string {
    if (!this.isLogged()) {
      return '';
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const values = JSON.parse(decodedPayload);
    return values.userEmail;
  }

  public logout(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
