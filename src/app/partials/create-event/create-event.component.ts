import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

    eventForm: FormGroup;

    constructor(private modalController: ModalController, private toastController: ToastController, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            vendorUsername: new FormControl(),
            eventDescription: new FormControl(),
            startDate: new FormControl(),
            startTime: new FormControl(),
            endDate: new FormControl(),
            endTime: new FormControl(),
            location: new FormControl(),
        });
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

    onSubmit() {
        this.presentToast();
        this.modalController.dismiss();
    }
}
