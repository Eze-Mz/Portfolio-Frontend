import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from 'src/app/forms/generic-modal/generic-modal.component';
import IEducation from 'src/app/Models/education.model';
import IExperience from 'src/app/Models/experience.model';
import IProyect from 'src/app/Models/proyect.model';
import ISkill from 'src/app/Models/skill.model';
import { AuthUserService } from 'src/app/services/auth-user.service';
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
  canEdit = false;
  faPlus = faPlus;
  @Input() sectionTitle: string = '';
  @Input() sectionId: string = '';
  portfolioEmail!: string;
  itemsList!: (IExperience & IEducation & IProyect & ISkill)[];
  constructor(
    private modal: NgbModal,
    private database: DatabaseService,
    private route: ActivatedRoute,
    private auth: AuthUserService
  ) {
    //Se podría hacer un observable o servicio que cuando se cargue el portfolio registre el email para hacer las llamadas a la base de datos con eso, en vez de crear una variable portfolio para cada sección. ¿Cambiaría algo en cuanto a performance?
    /* this.route.params.subscribe((params: Params) => {
      this.portfolioEmail = params['userEmail'];
    }); */
  }

  getDataFromDatabase() {
    if (this.sectionId) {
      this.database
        .getData(this.sectionId, this.portfolioEmail)
        .subscribe((data) => {
          this.itemsList = data;
        });
    }
  }

  //Bug para tener en cuenta: Los datos se buscar solo cuando el componente se inicia, si cambio de dirección pero el componente es el mismo no se vuelve a buscar los datos, por lo tanto tengo que cambiar los datos cuando me subscribo a una nueva ruta. Lo mismo para la variable canEdit.
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.portfolioEmail = params['userEmail'];
      this.getDataFromDatabase();
      if (this.auth.getUserEmail() === this.portfolioEmail) {
        this.canEdit = true;
      }
    });
  }

  updateList() {
    this.getDataFromDatabase();
  }

  openModal(edit: boolean = false, deleted: boolean = false) {
    const modalRef = this.modal.open(GenericModalComponent);
    modalRef.componentInstance.sectionId = this.sectionId;
    modalRef.closed.subscribe((res) => {
      this.getDataFromDatabase();
    });
  }
}
