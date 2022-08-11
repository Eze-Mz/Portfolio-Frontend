import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';

export const JWT_TOKEN = new HttpContextToken(() => false);

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private auth: AuthUserService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Si el usuario no está loggeado no se agrega el token
    if (!this.auth.isLogged()) {
      return next.handle(req);
    }

    //Si el usuario está loggeado sí se agrega
    let intReq = req;
    const token = this.auth.getToken();
    intReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(intReq);

    //! Depende de cómo implemente el acceso al token el tipo de chequeo que tengo que hacer.
    //! en el caso del video de arg programa se utiliza un observable que guarda el token
    //! en otro caso se puede utilizar directamente el token.
    /* let intReq = req;
    const token = this.auth.getToken();
    if (token) {
      intReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(intReq); */
  }
}

export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true },
];
