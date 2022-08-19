import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
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
  onSubmit = false;

  tareaRealizada = new UntypedFormControl('', [Validators.required]);
  empresa = new UntypedFormControl('', [Validators.required]);
  imagenEmpresa = new UntypedFormControl('');
  tiempoTrabajado = new UntypedFormControl('');
  descripcion = new UntypedFormControl('', [Validators.required]);

  experienceForm = new UntypedFormGroup({
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
        imagenEmpresa: this.data.img_empresa,
        tiempoTrabajado: this.data.tiempo,
        descripcion: this.data.descripcion,
      });
    }
  }

  addExperience() {
    this.onSubmit = true;
    const {
      tareaRealizada,
      empresa,
      tiempoTrabajado,
      descripcion,
      imagenEmpresa,
    } = this.experienceForm.value;

    const newExperience = {
      dataType: this.sectionId,
      tarea: tareaRealizada,
      empresa: empresa,
      img_empresa: imagenEmpresa,
      tiempo: tiempoTrabajado,
      descripcion: descripcion,
    };

    this.database
      .addData(this.sectionId, newExperience as IExperience)
      .subscribe(() => {
        this.activeModal.close(true);
        this.onSubmit = false;
      });
  }

  updateExperience() {
    const {
      tareaRealizada,
      empresa,
      tiempoTrabajado,
      descripcion,
      imagenEmpresa,
    } = this.experienceForm.value;

    this.data.tarea = tareaRealizada;
    this.data.empresa = empresa;
    this.data.img_empresa = imagenEmpresa;
    this.data.tiempo = tiempoTrabajado;
    this.data.descripcion = descripcion;
    this.data.dataType = this.sectionId;
    console.log(this.data);

    this.database
      .updateData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close());
  }

  deleteExperience() {
    console.log(this.data.id_exp);

    this.database
      .deleteData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close('list changed'));
  }
}
