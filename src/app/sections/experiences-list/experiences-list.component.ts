import { Component, OnInit } from '@angular/core';
import IExperience from 'src/app/Models/experience.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-experiences-list',
  templateUrl: './experiences-list.component.html',
  styleUrls: ['./experiences-list.component.css'],
})
export class ExperiencesListComponent implements OnInit {
  experiencesList!: IExperience[];
  pathId = 'experiences';
  constructor(private database: DatabaseService) {}

  retrieveData() {
    this.database
      .getData(this.pathId)
      .subscribe((data) => (this.experiencesList = data));
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  updateList() {
    this.retrieveData();
    console.log(this.experiencesList);
  }
}
