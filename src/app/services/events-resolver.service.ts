import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from '../services/event.service';

@Injectable()
export class EventsResolverService implements Resolve<any> {
    constructor(private eventService : EventService){}

    resolve() {
        return this.eventService.getEvents();
    }
    
}
