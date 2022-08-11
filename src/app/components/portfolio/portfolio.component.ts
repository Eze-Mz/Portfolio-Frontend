import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  //! Considerar que no se pueda acceder a esta sección si el email es inválido
  constructor() {}

  ngOnInit(): void {}
}
