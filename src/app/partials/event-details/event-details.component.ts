import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Event } from '../../models/event';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

    selectedEvent: Event;

    constructor(private modalController: ModalController, private params: NavParams) {
        this.selectedEvent = params.data.event;
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss();
    }    
}
