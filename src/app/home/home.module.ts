import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { EventsListComponent } from '../partials/events-list/events-list.component';
import { LoginComponent } from '../partials/login/login.component';
import { AccountService } from '../services/account.service';
import { RestService } from '../services/rest.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateEventComponent } from '../partials/create-event/create-event.component';
import { EventService } from '../services/event.service';

const PARTIALS = [
    EventsListComponent,
    LoginComponent,
    CreateEventComponent
];

const SERVICES = [
    EventService,
    AccountService,
    RestService
];

@NgModule({
    entryComponents: [CreateEventComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
              path: '',
              component: HomePage
            }
        ])
    ],
    providers: [SERVICES],
    declarations: [HomePage, PARTIALS]
})
export class HomePageModule {}
