import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Vendor } from '../../models/vendor';
import { MenuItem } from '../../models/menu-item';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-vendor-profile',
    templateUrl: './vendor-profile.component.html',
    styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {

    loggedInUser: string;
    vendorDetailsForm: FormGroup;
    model = new Vendor('', '', '', '', '', []);
    displayError = false;
    newItem = new MenuItem(null, null);

    constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

    ngOnInit() {
        this.vendorDetailsForm = this.formBuilder.group({
            username: [''],
            name: ['', Validators.maxLength(300)],
            foodType: ['', Validators.maxLength(200)],
            description: ['', Validators.maxLength(300)],
            region: ['', Validators.required],
            menu: this.formBuilder.array([
                this.formBuilder.control('')
            ])
        });
    }

    get menuItems() {
        return this.vendorDetailsForm.get('menu') as FormArray;
    }

    addItem() {
        this.menuItems.push(this.formBuilder.control(''));
    }

    removeItem(index: number) {
        this.menuItems.removeAt(index);
    }
}
