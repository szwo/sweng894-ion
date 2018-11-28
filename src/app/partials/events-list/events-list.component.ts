import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { SessionService } from '../../services/session.service';
import { Session } from '../../models/session';
import { ModalController } from '@ionic/angular';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

    authenticated = false;
    initialTop = true;
    public recommendedEvents: Array<Event> = [];
    public allEvents: Array<Event> = [];

    constructor(
        private modalController: ModalController,
        private eventService: EventService,
        private sessionService: SessionService) {
            this.eventService.getEvents();
        }

    ngOnInit() {
        this.populateEvents();

        this.sessionService.sessionObservable.subscribe((session: Session) => {
            if (session) {
                this.authenticated = session.authenticated;
            }
        });
    }

    async presentEventDetailsModal(event: Event) {
        const modal = await this.modalController.create({
            component: EventDetailsComponent,
            componentProps: { event }
        });

        return await modal.present();
    }

    populateEvents() {
        this.eventService.events.subscribe((events: Event[]) => {
            if (events && events.length > 0) {
                this.allEvents = events;
                if (this.initialTop) {
                    this.topRecommendedEvents();
                }
            }
        });
    }

    topRecommendedEvents() {
        this.initialTop = false;
        this.recommendedEvents = [];
        for (let i = 0; i < 3; i++) {
            this.recommendedEvents.push(this.allEvents[i]);
        }
    }

    populateSampleEvents(eventsList: Array<Event>) {
        for (let i = 1; i < 6; i++) {
            const newUser = 'Sample User' + i;
            const newStartDate = new Date();
            const newEndDate = new Date();
            const newAddress = 'Malvern';
            const newDescription = 'Sample Event #' + i;

            const newEvent: Event = {
                id: i,
                vendorUsername: newUser,
                start: newStartDate,
                end: newEndDate,
                address: newAddress,
                saleDescription: newDescription
            }

            eventsList.push(newEvent);
        }
    }

    navigate(event) {
        this.presentEventDetailsModal(event);
    }
}
