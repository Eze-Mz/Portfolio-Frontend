import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import IProyect from 'src/app/Models/proyect.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-proyect-form',
  templateUrl: './proyect-form.component.html',
  styleUrls: ['./proyect-form.component.css'],
})
export class ProyectFormComponent implements OnInit {
  @Input() sectionId!: string;
  @Input() edit = false;
  @Input() deleted = false;
  @Input() data!: IProyect;

  nombre = new UntypedFormControl('', [Validators.required]);
  tecnologias = new UntypedFormControl('');
  img_proyecto = new UntypedFormControl('');
  link_sitio = new UntypedFormControl('');
  link_repo = new UntypedFormControl('');
  descripcion = new UntypedFormControl('', [Validators.required]);

  proyectForm = new UntypedFormGroup({
    nombre: this.nombre,
    tecnologias: this.tecnologias,
    img_proyecto: this.img_proyecto,
    link_sitio: this.link_sitio,
    link_repo: this.link_repo,
    descripcion: this.descripcion,
  });

  constructor(
    public activeModal: NgbActiveModal,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.proyectForm.setValue({
        nombre: this.data.nombre,
        tecnologias: this.data.tecnologias,
        img_proyecto: this.data.img_proyecto,
        link_sitio: this.data.link_sitio,
        link_repo: this.data.link_repo,
        descripcion: this.data.descripcion,
      });
    }
  }

  addProyect() {
    const {
      nombre,
      tecnologias,
      img_proyecto,
      link_sitio,
      link_repo,
      descripcion,
    } = this.proyectForm.value;

    const newProyect = {
      dataType: this.sectionId,
      nombre: nombre,
      tecnologias: tecnologias,
      img_proyecto: img_proyecto,
      link_sitio: link_sitio,
      link_repo: link_repo,
      descripcion: descripcion,
    };

    this.database
      .addData(this.sectionId, newProyect as IProyect)
      .subscribe(() => this.activeModal.close(true));
  }

  updateProyect() {
    const {
      nombre,
      descripcion,
      img_proyecto,
      link_repo,
      link_sitio,
      tecnologias,
    } = this.proyectForm.value;
    this.data.nombre = nombre;
    this.data.tecnologias = tecnologias;
    this.data.img_proyecto = img_proyecto;
    this.data.link_sitio = link_sitio;
    this.data.link_repo = link_repo;
    this.data.descripcion = descripcion;
    this.data.dataType = this.sectionId;
    console.log(this.data);

    this.database
      .updateData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close());
  }

  deleteProyect() {
    this.database
      .deleteData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close('list changed'));
  }
}
