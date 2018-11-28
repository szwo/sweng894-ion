import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { CreateEventComponent } from '../partials/create-event/create-event.component';
import { EventsListComponent } from '../partials/events-list/events-list.component';
import { LoginComponent } from '../partials/login/login.component';
import { EventDetailsComponent } from '../partials/event-details/event-details.component';
import { VendorProfileComponent } from '../partials/vendor-profile/vendor-profile.component';
import { StarRatingModule } from 'ionic3-star-rating';
import { AccountService } from '../services/account.service';
import { RestService } from '../services/rest.service';
import { EventService } from '../services/event.service';
import { SessionService } from '../services/session.service';
import { EventsFilterPipe } from '../filters/eventsFilterPipe';

const PARTIALS = [
    EventsListComponent,
    LoginComponent,
    CreateEventComponent,
    EventDetailsComponent,
    VendorProfileComponent
];

const SERVICES = [
    EventService,
    AccountService,
    RestService,
    SessionService
];

@NgModule({
    entryComponents: [CreateEventComponent, EventDetailsComponent, VendorProfileComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        IonicModule,
        StarRatingModule,
        RouterModule.forChild([
            {
              path: '',
              component: HomePage
            }
        ])
    ],
    providers: [SERVICES],
    declarations: [HomePage, EventsFilterPipe, PARTIALS]
})
export class HomePageModule {}
