import { Component, Input, OnInit } from '@angular/core';
import IUser from 'src/app/Models/user.model';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host: { class: 'row justify-content-center' },
})

//! Tener en cuenta: el componente se inicia antes de que lleguen los datos. Eso se actualiza después.
export class AboutComponent implements OnInit {
  faGithubSquare = faGithubSquare as IconProp;
  faLinkedin = faLinkedin as IconProp;
  imgUrl = 'https://via.placeholder.com/200';
  @Input() data!: IUser;
  constructor() {}

  ngOnInit(): void {}
}
