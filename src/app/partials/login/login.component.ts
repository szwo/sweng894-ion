import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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
    private authenticated = false;

    constructor(private fb: FormBuilder, private alertController: AlertController, private accountService: AccountService, private sessionService: SessionService) {
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

    authenticate() {
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;
        const newSession = new Session(true, username, 'Malvern');

        this.sessionService.sessionData = newSession;

        /*this.accountService.getAccount(username).subscribe((account: Account) => {
            if (account) {
                this.authenticated = (password === account.password);
                sessionStorage.setItem("username", username);
                // TODO: this.loggedInUser = username;
                // TODO: this.submitted = true;
                // this.router.navigate(['/events']);
            } else {
                this.presentAlert();
            }
        });*/
    }
}
