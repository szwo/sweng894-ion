import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    private loginForm: FormGroup;
    private authenticated = false;

    constructor(private fb: FormBuilder, private alertController: AlertController, private accountService: AccountService) {
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

        this.accountService.getAccount(username).subscribe((account: Account) => {
            if (account) {
                this.authenticated = (password === account.password);
                sessionStorage.setItem("username", username);
                // TODO: this.loggedInUser = username;
                // TODO: this.submitted = true;
                // this.router.navigate(['/events']);
            } else {
                this.presentAlert();
            }
        });
    }
}
