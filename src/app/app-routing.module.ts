import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPortfolioComponent } from './components/lista-portfolio/lista-portfolio.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { LoginGuard } from './guard/login.guard';
import { PortfolioGuard } from './guard/portfolio.guard';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {
    path: 'portfolio/:userEmail',
    component: PortfolioComponent,
    canActivate: [PortfolioGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'lista-portfolio',
    component: ListaPortfolioComponent,
  },
  {
    path: '',
    redirectTo: 'lista-portfolio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
