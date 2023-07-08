import { Injectable, Optional } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc, getDocs, query, Timestamp, updateDoc, where, writeBatch } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { PunchType } from '../enums/PunchType';
import { Punch } from '../models/Punch';
import { punchConverter } from '../coverters/punch';

@Injectable({
  providedIn: 'root'
})
export class PunchService {

  private readonly punchCollection = collection(this.firestore, "punches").withConverter(punchConverter)

  constructor(private firestore: Firestore, @Optional() private auth: Auth) { }

  async addPunch(type: PunchType, time: Date, memo: string) {
    const punchDoc: Punch = {
      time: Timestamp.fromDate(time),
      type: type,
      memo: memo,
      uid: this.auth.currentUser?.uid!
    }

    return await addDoc(this.punchCollection, punchDoc)
  }

  async updatePunch(id: string, type: PunchType, memo: string, time: Date | Timestamp): Promise<void> {
    if (time instanceof Date) time = Timestamp.fromDate(time)

    return await updateDoc(doc(this.firestore, this.punchCollection.path, id), {
      type: type,
      memo: memo,
      time: time
    })
  }

  async getPunch(id: string): Promise<Punch> {
    try {
      let punch = await getDoc<Punch>(doc(this.firestore, this.punchCollection.path, id).withConverter(punchConverter));
      if (punch.exists()) return punch.data()
      else return Promise.reject(new Error("Unable to find punch"))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async getPunches(): Promise<Punch[]> {
    const q = query<Punch>(this.punchCollection, where('uid', '==', this.auth.currentUser?.uid!)).withConverter(punchConverter)

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
