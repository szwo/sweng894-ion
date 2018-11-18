export class Session {
    constructor(
        public authenticated: boolean, 
        public currentUser: string, 
        public preferredRegion: string){}
}