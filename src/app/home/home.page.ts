import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEventComponent } from '../partials/create-event/create-event.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    authenticated = true;
    hideLogin = false;
    
    constructor(private modalController: ModalController) {}
    
    async presentCreateEventModal() {
        const modal = await this.modalController.create({
            component: CreateEventComponent
        });

        return await modal.present();
    }

    hideLoginCard() {
        this.hideLogin = true;
    }

    openCreateEventForm() {
        this.presentCreateEventModal();
    }
}
