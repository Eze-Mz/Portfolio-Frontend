import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { SectionComponent } from './section/section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModalsModule } from '../forms/forms-modals.module';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [ProgressCircleComponent, SectionComponent, ItemComponent],
  imports: [CommonModule, FontAwesomeModule, NgbModule, FormsModalsModule],
  exports: [ProgressCircleComponent, SectionComponent],
})
export class SectionsModule {}
