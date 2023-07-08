import { Timestamp } from "@angular/fire/firestore";
import { PunchType } from "../enums/PunchType";

export interface Punch {
    id?: string;
    uid: string;
    time: Timestamp;
    type: PunchType;
    memo: string;
}

