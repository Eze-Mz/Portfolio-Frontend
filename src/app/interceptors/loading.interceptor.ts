import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  //* the idea is from here: https://zoaibkhan.com/blog/how-to-add-loading-spinner-in-angular-with-rxjs/
  totalRequests = 0;
  completedRequests = 0;

  constructor(private loader: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loader.show();
    this.totalRequests++;

    console.log(this.completedRequests, this.totalRequests);

    return next.handle(request).pipe(
      finalize(() => {
        this.completedRequests++;
        console.log(this.completedRequests, this.totalRequests);

        if (this.completedRequests === this.totalRequests) {
          this.loader.hide();
          this.totalRequests = 0;
          this.completedRequests = 0;
        }
      })
    );
  }
}
