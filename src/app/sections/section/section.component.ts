import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from 'src/app/forms/generic-modal/generic-modal.component';
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
  @Output() changedList = new EventEmitter();
  constructor(private modal: NgbModal, private database: DatabaseService) {}

  getDataFromDatabase() {
    this.database
      .getData(this.sectionId)
      .subscribe((data) => (this.experiencesList = data));
  }

  ngOnInit(): void {
    this.getDataFromDatabase();
  }

  openModal(edit: boolean, deleted: boolean) {
    const modalRef = this.modal.open(GenericModalComponent);
    modalRef.componentInstance.pathId = this.pathId;
    modalRef.closed.subscribe((res) => {
      console.log('closed observable');
      if (true) {
        this.changedList.emit();
      }
    });
  }
}
