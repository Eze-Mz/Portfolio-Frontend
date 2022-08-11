import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionsModule } from './sections/sections.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModalsModule } from './forms/forms-modals.module';
import { LoginComponent } from './user/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './user/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaPortfolioComponent } from './components/lista-portfolio/lista-portfolio.component';
import {
  interceptorProvider,
  UserInterceptor,
} from './interceptors/user.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    AboutComponent,
    FooterComponent,
    LoginComponent,
    PortfolioComponent,
    RegisterComponent,
    ListaPortfolioComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    SectionsModule,
    HttpClientModule,
    FormsModalsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
