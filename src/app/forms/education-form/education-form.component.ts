import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import IEducation from 'src/app/Models/education.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css'],
})
export class EducationFormComponent implements OnInit {
  @Input() sectionId!: string;
  @Input() edit = false;
  @Input() deleted = false;
  @Input() data!: IEducation;

  titulo = new UntypedFormControl('', [Validators.required]);
  institucion = new UntypedFormControl('', [Validators.required]);
  imagenInstitucion = new UntypedFormControl('');
  fechas = new UntypedFormControl('');
  descripcion = new UntypedFormControl('', [Validators.required]);

  educationForm = new UntypedFormGroup({
    titulo: this.titulo,
    institucion: this.institucion,
    imagenInstitucion: this.imagenInstitucion,
    fechas: this.fechas,
    descripcion: this.descripcion,
  });

  constructor(
    public activeModal: NgbActiveModal,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    //console.log(this.data.img_institucion);

    if (this.data) {
      this.educationForm.setValue({
        titulo: this.data.titulo,
        institucion: this.data.institucion,
        imagenInstitucion: this.data.img_inst,
        fechas: this.data.fechas,
        descripcion: this.data.descripcion,
      });
    }
  }

  addEducation() {
    const { titulo, institucion, imagenInstitucion, descripcion, fechas } =
      this.educationForm.value;

    const newEducation = {
      dataType: this.sectionId,
      titulo: titulo,
      institucion: institucion,
      img_inst: imagenInstitucion,
      fechas: fechas,
      descripcion: descripcion,
    };

    console.log(this.sectionId);

    this.database
      .addData(this.sectionId, newEducation as IEducation)
      .subscribe((data) => {
        this.activeModal.close(true);
      });
  }

  updateEducation() {
    const { titulo, institucion, imagenInstitucion, descripcion, fechas } =
      this.educationForm.value;

    this.data.titulo = titulo;
    this.data.institucion = institucion;
    this.data.img_inst = imagenInstitucion;
    this.data.descripcion = descripcion;
    this.data.fechas = fechas;
    this.data.dataType = this.sectionId;
    console.log(this.data);

    this.database
      .updateData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close());
  }

  deleteEducation() {
    this.database
      .deleteData(this.sectionId, this.data)
      .subscribe(() => this.activeModal.close('list changed'));
  }
}
