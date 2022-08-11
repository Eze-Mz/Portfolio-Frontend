import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioGuard implements CanActivate {
  constructor(private database: DatabaseService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let portfolioEmail = route.paramMap.get('userEmail');

    return this.database.userExistsByEmail(portfolioEmail ?? '').pipe(
      map((data) => {
        if (data === true) {
          return true;
        }
        this.router.navigate(['/lista-portfolio']);
        return !data;
      })
    );
  }
}
