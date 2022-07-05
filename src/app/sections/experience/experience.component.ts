import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTrash, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from 'src/app/forms/generic-modal/generic-modal.component';
import IExperience from 'src/app/Models/experience.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  host: { class: 'col-12 border border rounded-3 shadow p-2 pt-3' },
})
export class ExperienceComponent implements OnInit {
  faTrash = faTrash;
  faPenClip = faPenClip;
  @Input() sectionId!: string;
  @Input() item!: IExperience;
  @Output() changedList = new EventEmitter<IExperience>();

  constructor(private modal: NgbModal, private database: DatabaseService) {}

  openModal(edit: boolean, deleted: boolean) {
    const modalRef = this.modal.open(GenericModalComponent);
    modalRef.componentInstance.edit = edit;
    modalRef.componentInstance.deleted = deleted;
    modalRef.componentInstance.data = this.item;
    modalRef.componentInstance.pathId = this.sectionId;
    modalRef.closed.subscribe((res) => {
      console.log('closed observable');
      if (true) {
        this.changedList.emit();
      }
    });
  }

  ngOnInit(): void {}
}
