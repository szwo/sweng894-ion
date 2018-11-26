import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { Session } from '../../models/session';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

    eventId: number;
    eventForm: FormGroup;
    session: Session;
    selectedEvent : Event;

    constructor(
        private modalController: ModalController,
        private toastController: ToastController,
        private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private eventService: EventService,
        private params: NavParams,
    ) {}

    ngOnInit() {
        this.sessionService.sessionObservable.subscribe((session: Session) => {
            if (session) {
                this.session = session;
            }
        });
        this.selectedEvent = this.params.data.event;
        this.eventForm = this.formBuilder.group({
            vendorUsername: new FormControl(),
            eventDescription: new FormControl(),
            startDate: new FormControl(),
            startTime: new FormControl(),
            endDate: new FormControl(),
            endTime: new FormControl(),
            location: new FormControl(),
        });
        if(this.selectedEvent){
            this.eventId = this.selectedEvent.id;
            this.eventForm.setValue({
                "vendorUsername" : this.selectedEvent.vendorUsername,
                "eventDescription" : this.selectedEvent.saleDescription,
                "startDate": this.selectedEvent.start,
                "startTime" : "",//new Date().getTime(),
                "endDate" : this.selectedEvent.end,
                "endTime" : "",//new Date().getTime(),
                "location" : this.selectedEvent.address
            });
        } 
    }

    async presentToast() {
        const toast = await this.toastController.create({
            position: 'bottom',
            color: 'success',
            mode: 'ios',
            message: 'Event Created!',
            duration: 2000
        });
        toast.present();
    }

    closeModal() {
        this.modalController.dismiss();
    }

    saveEvent() {
        // TODO: Dynamically pull Vendor, utilize time fields
        if(!this.eventId){
            this.eventId = Math.floor(Math.random() * 879798) + 1;
        }
        const event = new Event(
            this.eventId, 
            this.session.currentUser,
            this.eventForm.value.startDate,
            this.eventForm.value.endDate,
            this.eventForm.value.location,
            this.eventForm.value.eventDescription
        );

        this.eventService.createEvent(event).then(() => {
            this.eventService.getEvents();
        });

        this.presentToast();
        this.modalController.dismiss();
    }
}
