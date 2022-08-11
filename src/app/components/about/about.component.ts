import { Component, Input, OnInit } from '@angular/core';
import IUser from 'src/app/Models/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host: { class: 'row' },
})

//! Tener en cuenta: el componente se inicia antes de que lleguen los datos. Eso se actualiza después.
export class AboutComponent implements OnInit {
  imgUrl = 'https://via.placeholder.com/200';
  @Input() data!: IUser;
  constructor() {}

  ngOnInit(): void {}
}
