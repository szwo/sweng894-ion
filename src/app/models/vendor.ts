import { MenuItem } from "./menu-item";

export class Vendor {
    constructor(public username: string, public name: string, public foodType: string, public description: string, public region : string, public menu: MenuItem[]) {}
}