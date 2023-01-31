import { Injectable, Optional } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDocs, query, Timestamp, where, writeBatch } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { PunchType } from '../enums/PunchType';
import { Punch } from '../models/Punch';

@Injectable({
  providedIn: 'root'
})
export class PunchService {

  private readonly punchCollection = collection(this.firestore, "punches")

  constructor(private firestore: Firestore, @Optional() private auth: Auth) { }

  async addPunch(type: PunchType, time: number) {
    const punchDoc: Punch = {
      time: Timestamp.fromMillis(time),
      type: type,
      uid: this.auth.currentUser?.uid!
    }

    return await addDoc(this.punchCollection, punchDoc)
  }

  async getPunches(): Promise<Punch[]> {
    const q = query(this.punchCollection, where('uid', '==', this.auth.currentUser?.uid!))

    try {
      const snapshot = await getDocs(q)
      let output: Punch[] = []

      snapshot.forEach(doc => {
        let punch = (doc.data() as Punch)
        punch.id = doc.id
        output.push(punch)
      })

      return output;

    } catch (err) {
      return Promise.reject(err);
    }
  }


  async deletePunches(punches: Punch[]) {
    const batch = writeBatch(this.firestore);

    if (punches.length >= 500) {
      // Error handled in component
      return Promise.reject(-1);
    }

    for (let i = 0; i < punches.length; i++) {
      const punch = punches[i];
      batch.delete(doc(this.firestore, this.punchCollection.path, punch.id!))
    }

    return await batch.commit()
  }

}
