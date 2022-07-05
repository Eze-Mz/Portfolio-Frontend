import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import IExperience from 'src/app/Models/experience.model';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css'],
})
export class ExperienceFormComponent implements OnInit {
  @Input() sectionId!: string;
  @Input() edit = false;
  @Input() deleted = false;
  @Input() data!: IExperience;

  tareaRealizada = new FormControl('', [Validators.required]);
  empresa = new FormControl('', [Validators.required]);
  imagenEmpresa = new FormControl('');
  tiempoTrabajado = new FormControl('');
  descripcion = new FormControl('', [Validators.required]);

  experienceForm = new FormGroup({
    tareaRealizada: this.tareaRealizada,
    empresa: this.empresa,
    imagenEmpresa: this.imagenEmpresa,
    tiempoTrabajado: this.tiempoTrabajado,
    descripcion: this.descripcion,
  });

  constructor(
    public activeModal: NgbActiveModal,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.experienceForm.setValue({
        tareaRealizada: this.data.tarea,
        empresa: this.data.empresa,
        imagenEmpresa: this.data.imagen,
        tiempoTrabajado: this.data.tiempo,
        descripcion: this.data.descripcion,
      });
    }
  }

  addExperience() {
    const { tareaRealizada, empresa, tiempoTrabajado, descripcion } =
      this.experienceForm.value;

    const newExperience = {
      tarea: tareaRealizada,
      empresa: empresa,
      imagen: '',
      tiempo: tiempoTrabajado,
      descripcion: descripcion,
    };

    this.database
      .addData(this.sectionId, newExperience as IExperience)
      .subscribe(() => this.activeModal.close(true));
  }

  updateExperience() {
    const { tareaRealizada, empresa, tiempoTrabajado, descripcion } =
      this.experienceForm.value;

    this.data.tarea = tareaRealizada;
    this.data.empresa = empresa;
    this.data.tiempo = tiempoTrabajado;
    this.data.descripcion = descripcion;

    this.database
      .updateData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close());
  }

  deleteExperience() {
    this.database
      .deleteData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close('list changed'));
  }
}
