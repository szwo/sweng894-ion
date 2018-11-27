import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Session } from '../../models/session';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

    selectedEvent: Event;
    displayError = false;
    canEdit = false;

    constructor(private modalController: ModalController, private toastController: ToastController, private sessionService :SessionService, private router: Router, private params: NavParams, private eventService: EventService) {
        this.selectedEvent = params.data.event;
    }

    ngOnInit() {
        this.sessionService.sessionObservable.subscribe((session: Session) => {
            if (session) {
                this.canEdit = session.currentUser === this.selectedEvent.vendorUsername;
            }
        });
    }

    closeModal() {
        this.modalController.dismiss();
    }    

    deleteEvent(){
        this.eventService.deleteEvent(this.selectedEvent.id).subscribe((response) => {
			const toast = this.toastController.create({
                position: 'bottom',
                color: 'success',
                mode: 'ios',
                message: 'Event Deleted!',
                duration: 2000
            });
            this.eventService.getEvents();
            this.modalController.dismiss();
		},
        error => this.displayError = true);
        
    }

    editEvent(selectedEvent: Event) {
        this.closeModal();
        this.presentEventDetailsModal(selectedEvent);
    }

    async presentEventDetailsModal(event: Event) {
        const modal = await this.modalController.create({
            component: CreateEventComponent,
            componentProps: { event }
        });

        return await modal.present();
    }
}
