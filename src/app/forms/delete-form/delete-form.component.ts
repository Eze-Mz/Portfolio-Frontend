import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css'],
})
export class DeleteFormComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private database: DatabaseService,
    private router: Router,
    private auth: AuthUserService
  ) {}

  ngOnInit(): void {}

  deleteUser() {
    this.database.deleteUser().subscribe((data) => {
      this.activeModal.close();
      this.auth.logout();
      this.router.navigate([`/`]);
    });
  }
}
