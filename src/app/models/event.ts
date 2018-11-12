import { Vendor } from './vendor';

export class Event {
    constructor(
        public id: number,
        public vendorUsername: string,
        public start: Date,
        public end: Date,
        public address: string,
        public saleDescription: string,
    ) { }
}