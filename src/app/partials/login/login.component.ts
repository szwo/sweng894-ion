import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

import { Session } from '../../models/session';
import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    private loginForm: FormGroup;

    constructor(private fb: FormBuilder, private toastController: ToastController, private alertController: AlertController, private accountService: AccountService, private sessionService: SessionService) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Login Failed',
            message: 'Login failed, please try again.',
            buttons: ['OK']
        });

        await alert.present();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            position: 'bottom',
            color: 'success',
            mode: 'ios',
            message: 'Log in success!',
            duration: 2000
        });
        toast.present();
    }

    authenticate() {
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;

        this.accountService.getAccount(username).subscribe((account: Account) => {
            if (account && password === account.password) {
                this.sessionService.sessionData = new Session(true, username, 'Malvern');
                this.presentToast();
            } else {
                this.presentAlert();
            }
        });
    }
}
