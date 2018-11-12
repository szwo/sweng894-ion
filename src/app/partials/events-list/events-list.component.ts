import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { SessionService } from '../../services/session.service';
import { Session } from '../../models/session';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

    authenticated = false;
    public recommendedEvents: Array<Event> = [];
    public allEvents: Array<Event> = [];

    constructor(private sessionService: SessionService) { 
        this.populateSampleEvents(this.allEvents);
        this.populateSampleEvents(this.recommendedEvents);
    }

    ngOnInit() {
        this.sessionService.sessionObservable.subscribe((session: Session) => {
            if (session) {
                this.authenticated = session.authenticated;
            }
        });
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

    navigate(item) {
        console.log(item);
    }
}
