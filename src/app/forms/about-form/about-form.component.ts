import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import IUser from 'src/app/Models/user.model';
import { DatabaseService } from 'src/app/services/database.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.css'],
})
export class AboutFormComponent implements OnInit {
  @Input() sectionId!: string;
  @Input() data!: IUser;

  nombre = new UntypedFormControl('');
  puesto = new UntypedFormControl('');
  sobreMi = new UntypedFormControl('');
  imgHero = new UntypedFormControl('');
  imgPerfil = new UntypedFormControl('');
  link1 = new UntypedFormControl('');
  link2 = new UntypedFormControl('');

  aboutForm = new UntypedFormGroup({
    nombre: this.nombre,
    puesto: this.puesto,
    sobreMi: this.sobreMi,
    imgHero: this.imgHero,
    imgPerfil: this.imgPerfil,
    link1: this.link1,
    link2: this.link2,
  });

  constructor(
    private database: DatabaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.aboutForm.setValue({
        nombre: this.data.nombre,
        puesto: this.data.puesto,
        sobreMi: this.data.sobre_mi,
        imgHero: this.data.img_hero,
        imgPerfil: this.data.img_perfil,
        link1: this.data.link_1,
        link2: this.data.link_2,
      });
    }
  }

  updateAbout() {
    const { nombre, puesto, sobreMi, imgHero, imgPerfil, link1, link2 } =
      this.aboutForm.value;

    this.data.nombre = nombre;
    this.data.puesto = puesto;
    this.data.sobre_mi = sobreMi;
    this.data.img_hero = imgHero;
    this.data.img_perfil = imgPerfil;
    this.data.link_1 = link1;
    this.data.link_2 = link2;

    this.database.updateUserData(this.data).subscribe((res) => {
      this.activeModal.close(true);
    });
  }
}
