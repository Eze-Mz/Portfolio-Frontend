import { Component, OnInit } from '@angular/core';
import IEducation from 'src/app/Models/education.model';
import IExperience from 'src/app/Models/experience.model';
import IProyect from 'src/app/Models/proyect.model';
import ISkill from 'src/app/Models/skill.model';
import IUser from 'src/app/Models/user.model';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css'],
})
export class GenericModalComponent implements OnInit {
  sectionId!: string;
  edit = false;
  deleted = false;
  data!: IExperience & IEducation & IProyect & ISkill & IUser;

  constructor() {}

  ngOnInit(): void {}
}
