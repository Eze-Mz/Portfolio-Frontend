import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { ProyectComponent } from './proyect/proyect.component';
import { SectionComponent } from './section/section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModalsModule } from '../forms/forms-modals.module';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    EducationComponent,
    ExperienceComponent,
    ProgressCircleComponent,
    ProyectComponent,
    SectionComponent,
    ItemComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, NgbModule, FormsModalsModule],
  exports: [
    EducationComponent,
    ExperienceComponent,
    ProgressCircleComponent,
    ProyectComponent,
    SectionComponent,
  ],
})
export class SectionsModule {}
