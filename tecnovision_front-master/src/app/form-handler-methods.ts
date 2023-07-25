import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalCompoComponent } from './custom-modal-compo/custom-modal-compo.component';

export class FormHandlerMethods {

    cleanFormFields(messages: string[]): boolean {
        const inputs = document.getElementsByTagName('small');
        let hide = true;
        if (messages[0].includes('ha sido') || messages[0].includes('actualizados') || messages[0].includes('Error') || messages[0].includes('existe')) {
            hide = false;
            document.getElementById('componentContainer').scrollTo(0, 0);
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i] !== undefined) {
                    inputs[i].innerHTML = '';
                }
            }
        } else {
            for (let i = 0; i < messages.length; i++) {
                inputs[i].innerHTML = (messages[i] !== ' ') ? messages[i] : '';
            }
        }
        return hide;
    }

    showModal(message: string, messageClass: string, modalService: NgbModal, route: string): void {
        const modalData = modalService.open(CustomModalCompoComponent, CustomModalCompoComponent.modalOptions);
        modalData.componentInstance.message = message;
        modalData.componentInstance.messageClass = messageClass;
        modalData.componentInstance.route = route;
    }

}
