import { Component, OnInit } from '@angular/core';
import IPortfolio from 'src/app/Models/portfolio.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-lista-portfolio',
  templateUrl: './lista-portfolio.component.html',
  styleUrls: ['./lista-portfolio.component.css'],
})
export class ListaPortfolioComponent implements OnInit {
  userList!: IPortfolio[];
  userLinks!: string[];

  constructor(private database: DatabaseService) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.database.getUsersList().subscribe({
      next: (list) => {
        this.userList = list;
      },
    });
  }
}
