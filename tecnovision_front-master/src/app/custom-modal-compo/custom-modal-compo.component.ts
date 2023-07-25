import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-modal-compo',
  templateUrl: './custom-modal-compo.component.html',
  styleUrls: ['./custom-modal-compo.component.css']
})
export class CustomModalCompoComponent {

  @Input() message = '';
  @Input() messageClass = '';
  @Input() route = '';

  static modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  }

  constructor(public activeModal: NgbActiveModal,
    private router: Router) { }

  goToHomePage(): void {
    if (!this.messageClass.includes('danger')) {
      setTimeout(() => this.router.navigate(['/'+ this.route])
        , 500);
    }
  }

}
