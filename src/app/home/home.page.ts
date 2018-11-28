import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEventComponent } from '../partials/create-event/create-event.component';
import { Session } from '../models/session';
import { SessionService } from '../services/session.service';
import { VendorProfileComponent } from '../partials/vendor-profile/vendor-profile.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    session: Session;
    authenticated = false;
    hideLogin = false;
    
    constructor(private modalController: ModalController, private sessionService: SessionService) {
        this.sessionService.sessionObservable.subscribe((session: Session) => {
            if (session) {
                this.session = session;
                this.authenticated = session.authenticated;
                this.hideLogin = !this.authenticated;
            }
        });
    }
    
    async presentCreateEventModal() {
        const modal = await this.modalController.create({
            component: CreateEventComponent
        });

        return await modal.present();
    }

    async presentVendorProfileModal() {
        const modal = await this.modalController.create({
            component: VendorProfileComponent
        });

        return await modal.present();
    }

    hideLoginCard() {
        this.hideLogin = true;
    }

    logout() {
        this.sessionService.sessionData = new Session(false, null, null);
        this.hideLogin = false;
        this.sessionService.reset();
    }

    openCreateEventForm() {
        this.presentCreateEventModal();
    }

    openVendorProfile() {
        this.presentVendorProfileModal();
    }
}
