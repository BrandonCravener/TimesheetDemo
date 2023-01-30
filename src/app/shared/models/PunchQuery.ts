import { PunchType } from "../enums/PunchType";

export interface PunchQuery {
    time: {
        seconds: number;
        nanoseconds: number;
    }
    type: PunchType,
    uid: string
}