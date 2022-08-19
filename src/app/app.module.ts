import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/portfolio/header/header.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { AboutComponent } from './components/portfolio/about/about.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SectionsModule } from './components/portfolio/sections/sections.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModalsModule } from './forms/forms-modals.module';
import { LoginComponent } from './components/user/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/user/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaPortfolioComponent } from './components/lista-portfolio/lista-portfolio.component';
import { interceptorProvider } from './interceptors/user.interceptor';
import { LoadingComponent } from './components/shared/loading/loading.component';

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
    LoadingComponent,
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
