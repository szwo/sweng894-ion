import { Vendor } from './vendor';

export class Review {
    constructor(
        public loggedInUser : string,
        public vendorUsername: string,
        public comment: string,
        public rating: number
    ) { }
}