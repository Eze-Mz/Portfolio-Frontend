import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faPenClip } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from 'src/app/forms/generic-modal/generic-modal.component';
import IUser from 'src/app/Models/user.model';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoading = false;
  canEdit = false;
  sectionId = 'about';
  portfolioEmail: string = '';
  item!: IUser;
  @HostBinding('style.background-image') public imgUrl: string = '';
  faPenClip = faPenClip;
  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private database: DatabaseService,
    private auth: AuthUserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.portfolioEmail = params['userEmail'];
      this.getUserData();
    });
    if (this.auth.getUserEmail() === this.portfolioEmail) {
      this.canEdit = true;
    }
  }

  getUserData() {
    this.isLoading = true;
    return this.database.getUserData(this.portfolioEmail).subscribe((data) => {
      this.item = data;
      data.img_hero
        ? (this.imgUrl = `url(${data.img_hero})`)
        : (this.imgUrl = `url("https://via.placeholder.com/1200")`);
      this.isLoading = false;
    });
  }

  openModal(edit: boolean, deleted: boolean) {
    const modalRef = this.modal.open(GenericModalComponent);
    modalRef.componentInstance.edit = edit;
    modalRef.componentInstance.deleted = deleted;
    modalRef.componentInstance.data = this.item;
    modalRef.componentInstance.sectionId = this.sectionId;
    modalRef.closed.subscribe((res) => {
      this.getUserData();
    });
  }
}
