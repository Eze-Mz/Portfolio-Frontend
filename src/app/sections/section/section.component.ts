import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from 'src/app/forms/generic-modal/generic-modal.component';
import IEducation from 'src/app/Models/education.model';
import IExperience from 'src/app/Models/experience.model';
import IProyect from 'src/app/Models/proyect.model';
import ISkill from 'src/app/Models/skill.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  host: {
    class: 'row mt-5 mb-5 g-4 p-3 border border rounded-3 shadow-sm',
  },
})
export class SectionComponent implements OnInit {
  faPlus = faPlus;
  @Input() sectionTitle: string = '';
  @Input() sectionId: string = '';
  itemsList!: (IExperience & IEducation & IProyect & ISkill)[];
  constructor(private modal: NgbModal, private database: DatabaseService) {}

  getDataFromDatabase() {
    if (this.sectionId) {
      this.database
        .getData(this.sectionId)
        .subscribe((data) => (this.itemsList = data));
    }
  }

  ngOnInit(): void {
    this.getDataFromDatabase();
  }

  updateList() {
    this.getDataFromDatabase();
  }

  openModal(edit: boolean = false, deleted: boolean = false) {
    const modalRef = this.modal.open(GenericModalComponent);
    modalRef.componentInstance.sectionId = this.sectionId;
    modalRef.closed.subscribe((res) => {
      console.log('closed observable');
      this.getDataFromDatabase();
    });
  }
}
