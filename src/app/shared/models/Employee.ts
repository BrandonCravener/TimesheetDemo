import { Timestamp } from "@angular/fire/firestore";

export interface Employee {
    fullName: string;
    preferredName: string;
    added: Timestamp;
}