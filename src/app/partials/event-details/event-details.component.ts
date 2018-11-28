import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController, Events } from '@ionic/angular';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { Session } from '../../models/session';
import { CreateEventComponent } from '../create-event/create-event.component';
import { StarRatingModule } from 'ionic3-star-rating';
import { Review } from '../../models/review';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

    selectedEvent: Event;
    displayError = false;
    canEdit = false;
    rating : number;
    reviewForm: FormGroup;
    reviews : Array<Review>;
    session: Session;

    constructor(private modalController: ModalController, 
        private starRatingModule : StarRatingModule, 
        private toastController: ToastController, 
        private sessionService :SessionService, 
        private router: Router, 
        private params: NavParams, 
        private eventService: EventService, 
        private events: Events,
        private formBuilder: FormBuilder,) {
        this.selectedEvent = params.data.event;
        events.subscribe('star-rating:changed', (starRating) => {
            console.log(starRating);
            this.rating = starRating;
        });
    }

    ngOnInit() {
        this.sessionService.sessionObservable.subscribe((session: Session) => {
            if (session) {
                this.session = session;
                this.canEdit = session.currentUser === this.selectedEvent.vendorUsername;
                this.reviewForm = this.formBuilder.group({
                    comment: new FormControl(),
                    loggedInUser : [this.session.currentUser],
                    vendorUsername: [this.selectedEvent.vendorUsername],
                    rating: [this.rating],
                });
            }
        });
        this.eventService.getReviews(this.selectedEvent.vendorUsername).subscribe((reviews : Array<Review>) => {
            this.reviews = reviews;
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
    submitReview(){
        this.reviewForm.patchValue({"rating": this.rating});
        this.eventService.createReview(JSON.stringify(this.reviewForm.value)).subscribe((review : Review) => {
            this.reviews.push(this.reviewForm.value);
            console.log(review);
            this.reviewForm.reset();
        });
    }

    async presentEventDetailsModal(event: Event) {
        const modal = await this.modalController.create({
            component: CreateEventComponent,
            componentProps: { event }
        });

        return await modal.present();
    }
}
