import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";
import { Punch } from "../models/Punch";

export const punchConverter = {
    toFirestore(punch: Punch): DocumentData {
        return punch
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Punch {
        const data = snapshot.data(options)
        return (data as Punch)
    }
}