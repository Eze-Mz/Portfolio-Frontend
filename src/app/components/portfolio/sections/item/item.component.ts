import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { faTrash, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from 'src/app/forms/generic-modal/generic-modal.component';
import IEducation from 'src/app/Models/education.model';
import IExperience from 'src/app/Models/experience.model';
import IProyect from 'src/app/Models/proyect.model';
import ISkill from 'src/app/Models/skill.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  faTrash = faTrash;
  faPenClip = faPenClip;
  @Input() canEdit = false;
  @Input() sectionId!: string;
  @Input() item!: IExperience & IEducation & IProyect & ISkill;
  @Output() changedList = new EventEmitter<IExperience>();
  @HostBinding('className') itemClass: string = '';
  constructor(private modal: NgbModal) {}

  openModal(edit: boolean, deleted: boolean) {
    const modalRef = this.modal.open(GenericModalComponent);
    modalRef.componentInstance.edit = edit;
    modalRef.componentInstance.deleted = deleted;
    modalRef.componentInstance.data = this.item;
    modalRef.componentInstance.sectionId = this.sectionId;
    modalRef.closed.subscribe((res) => {
      this.changedList.emit();
    });
  }

  ngOnInit(): void {
    switch (this.sectionId) {
      case 'experiences':
        this.itemClass = 'col-12 border border rounded-3 shadow p-2 pt-3';
        this.item as IExperience;
        break;
      case 'education':
        this.itemClass = 'col-12 border border rounded-3 shadow';
        this.item as IEducation;
        break;
      case 'skills':
        this.itemClass =
          'col-xl-3 col-lg-4 col-md-6 my-3 d-flex justify-content-center';
        this.item as IProyect;
        break;
      case 'proyects':
        this.itemClass = 'shadow';
        this.item as ISkill;
        break;
    }
  }

  separarTecnologias(tecnologias: string): string[] {
    return tecnologias.split(',').map((string) => string.trim());
  }
}
