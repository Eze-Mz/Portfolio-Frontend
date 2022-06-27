import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceFormComponent } from './experience-form/experience-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenericModalComponent } from './generic-modal/generic-modal.component';

@NgModule({
  declarations: [ExperienceFormComponent, GenericModalComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ExperienceFormComponent],
})
export class FormsModalsModule {}
