import { Timestamp } from "@angular/fire/firestore";

export interface User {
    fullName: string;
    preferredName: string;
    added: Timestamp;
}