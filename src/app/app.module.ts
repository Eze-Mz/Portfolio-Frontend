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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    AboutComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    SectionsModule,
    HttpClientModule,
    FormsModalsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
