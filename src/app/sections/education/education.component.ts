import { Component, OnInit } from '@angular/core';
import { faTrash, faPenClip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  host: { class: 'col-12 border border rounded-3 shadow' },
})
export class EducationComponent implements OnInit {
  faTrash = faTrash;
  faPenClip = faPenClip;

  constructor() {}

  ngOnInit(): void {}
}
