import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Event } from '../models/event';
import { Review } from '../models/review';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EventService {

    private _events = new BehaviorSubject<Event[]>(null);

    constructor(private restService: RestService) {
        // TODO: Perhaps initialize events
    }

    createEvent(event: Event): Promise<any> {
        // TODO: Decomposing event to send without Vendor, fix
        const payload = {
            id: event.id,
            vendorUsername: event.vendorUsername,
            saleDescription: event.saleDescription,
            start: event.start,
            end: event.end,
            address: event.address
        };

        return new Promise((resolve,reject) => {
            this.postEvent(JSON.stringify(payload)).subscribe((response: any) => {
                // this.events.push(event);
                resolve();
            });
        });
    }
    createReview(payload: any): Observable<Review>{
        return this.restService.post('/api/createReview/', payload);
    }

    deleteEvent(id: number): Observable<Event>{
        return this.restService.delete('/api/deleteEvent/' + id);
    }

    getEvent(id: number): Observable<Event> {
        return this.restService.get("/api/getEvent/" + id)
            .pipe(catchError(this.handleError<any>('getEvent')));
    }

    getReviews(vendorUsername: string): Observable<Review[]> {
        return this.restService.get("/api/getReviews/" + vendorUsername)
            .pipe(catchError(this.handleError<any>('getReviews')));
    }

    getEvents() {
        this.restService.get('/api/getEvents').pipe(catchError(this.handleError<any>('getEvents', []))).subscribe((value: any) => {
            this._events.next(value);
        });
    }

    postEvent(payload: any): Observable<Event> {
        return this.restService.post('/api/createEvent/', payload);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }

    get events(): Observable<Event[]> {
        return this._events;
    }
}
