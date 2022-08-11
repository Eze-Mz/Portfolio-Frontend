import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import ISkill from 'src/app/Models/skill.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css'],
})
export class SkillFormComponent implements OnInit {
  @Input() sectionId!: string;
  @Input() edit = false;
  @Input() deleted = false;
  @Input() data!: ISkill;

  skill = new UntypedFormControl('', [Validators.required]);
  percentage = new UntypedFormControl('', [Validators.required]);

  skillForm = new UntypedFormGroup({
    skill: this.skill,
    percentage: this.percentage,
  });

  constructor(
    public activeModal: NgbActiveModal,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.skillForm.setValue({
        skill: this.data.habilidad,
        percentage: this.data.porcentaje,
      });
    }
  }

  addSkill() {
    const { skill, percentage } = this.skillForm.value;

    const newSkill = {
      dataType: this.sectionId,
      habilidad: skill,
      porcentaje: percentage,
    };

    console.log(newSkill);

    this.database
      .addData(this.sectionId, newSkill as ISkill)
      .subscribe(() => this.activeModal.close(true));
  }

  updateSkill() {
    const { skill, percentage } = this.skillForm.value;

    this.data.habilidad = skill;
    this.data.porcentaje = percentage;
    this.data.dataType = this.sectionId;
    console.log(this.data);

    this.database
      .updateData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close());
  }

  deleteSkill() {
    this.database
      .deleteData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close('list changed'));
  }
}
