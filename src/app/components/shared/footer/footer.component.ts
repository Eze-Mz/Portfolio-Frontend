import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from 'src/app/forms/generic-modal/generic-modal.component';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { PortfolioComponent } from '../../portfolio/portfolio.component';
import { RegisterComponent } from '../../user/register/register.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isLogged = false;
  currentUserEmail?: string;
  currentUserPortfolio? = false;
  isPortfolioComponent? = false;
  isRegisterComponent? = false;
  modalId = 'delete-form';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthUserService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.isLogged = this.auth.isLogged();
    this.currentUserEmail = this.auth.getUserEmail();
    this.route.params.subscribe((params: Params) => {
      this.currentUserPortfolio = params['userEmail'] === this.currentUserEmail;
    });
    this.isPortfolioComponent = this.route.component === PortfolioComponent;
    this.isRegisterComponent = this.route.component === RegisterComponent;
  }

  openModal(edit: boolean = false, deleted: boolean = false) {
    const modalRef = this.modal.open(GenericModalComponent);
    modalRef.componentInstance.sectionId = this.modalId;
    modalRef.closed.subscribe();
  }
}
