import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public isMenuCollapsed = true;
  isLogged = false;
  currentUserPath!: string;

  constructor(
    private auth: AuthUserService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.auth.isLogged();
    this.currentUserPath = `/portfolio/${this.auth.getUserEmail()}`;
  }

  logout() {
    this.auth.logout();
  }

  //al eliminar la cuenta lo básico que se me ocurre es:
  // 1. redirigir al usuario
  // 2. limpiar el storage
  deleteAccount() {
    this.database.deleteUser().subscribe(() => {
      this.auth.logout();
    });
  }
}
