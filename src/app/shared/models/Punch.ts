import { Timestamp } from "@angular/fire/firestore";
import { PunchType } from "../enums/PunchType";

export interface Punch {
    uid: string;
    time: Timestamp;
    type: PunchType;
}