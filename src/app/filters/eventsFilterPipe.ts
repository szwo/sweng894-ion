import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event';

@Pipe({
    name: 'eventsFilter',
    pure: false
})
export class EventsFilterPipe implements PipeTransform {
    transform(events: Event[], location: string, startDate: Date): Event[] {
        if (location == "" || location == undefined) {
            return events;
        }

        return events.filter(event => event.address.includes(location));
    }
}