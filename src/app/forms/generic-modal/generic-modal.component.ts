import { Component, OnInit } from '@angular/core';
import IExperience from 'src/app/Models/experience.model';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css'],
})
export class GenericModalComponent implements OnInit {
  sectionId!: string;
  edit = false;
  deleted = false;
  data!: IExperience;

  constructor() {}

  ngOnInit(): void {}
}
