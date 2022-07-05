import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceFormComponent } from './experience-form/experience-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { EducationFormComponent } from './education-form/education-form.component';
import { SkillFormComponent } from './skill-form/skill-form.component';
import { ProyectFormComponent } from './proyect-form/proyect-form.component';
import { AboutFormComponent } from './about-form/about-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    ExperienceFormComponent,
    GenericModalComponent,
    EducationFormComponent,
    SkillFormComponent,
    ProyectFormComponent,
    AboutFormComponent,
    LoginFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ExperienceFormComponent],
})
export class FormsModalsModule {}
