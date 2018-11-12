import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {

    constructor(private modalController: ModalController) { }

    closeModal() {
        this.modalController.dismiss();
    }
}
