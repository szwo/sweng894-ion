import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Vendor } from '../../models/vendor';
import { MenuItem } from '../../models/menu-item';
import { AccountService } from '../../services/account.service';
import { SessionService } from '../../services/session.service';
import { Session } from '../../models/session';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-vendor-profile',
    templateUrl: './vendor-profile.component.html',
    styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {

    session: Session;
    vendorDetailsForm: FormGroup;
    model = new Vendor('', '', '', '', '', []);
    displayError = false;
    newItem = new MenuItem(null, null);

    constructor(private modalController: ModalController, private formBuilder: FormBuilder, private sessionService: SessionService, private accountService: AccountService) {
        this.sessionService.sessionObservable.subscribe((session: Session) => {
            if (session) {
                this.session = session;
            }
        });
    }

    ngOnInit() {
        this.vendorDetailsForm = this.formBuilder.group({
            username: [''],
            name: ['', Validators.maxLength(140)],
            foodType: ['', Validators.maxLength(140)],
            description: ['', Validators.maxLength(140)],
            menu: this.formBuilder.array([
                this.formBuilder.control('')
            ])
        });

        // this.accountService.getVendorDetails(this.session.currentUser).subscribe((vendor: Vendor) => {
        //     if (!vendor[0]) {
        //         this.vendorDetailsForm.setValue({
        //             "username": vendor.username,
        //             "name": vendor.name,
        //             "foodType": vendor.foodType,
        //             "description": this.checkEmpty(vendor.description),
        //             "region": this.checkEmpty(vendor.region),
        //             "menu": [vendor.menu]
        //         })
        //     }
        // })
    }

    private checkEmpty(value) {
        var val = ""
        if (value) {
            val = value;
        }
        return val;
    }

    addItem() {
        this.menuItems.push(this.formBuilder.control(''));
    }

    removeItem(index: number) {
        this.menuItems.removeAt(index);
    }

    saveForm() {
        if (!this.menuItems.pristine) {
            this.model.menu = this.menuItems.value;
        }
        this.displayError = false;
        this.vendorDetailsForm.patchValue({ 'username': this.session.currentUser });
    }

    closeModal() {
        this.modalController.dismiss();
    }  

    get menuItems() {
        return this.vendorDetailsForm.get('menu') as FormArray;
    }
}
