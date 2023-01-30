import { Injectable, Optional } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDocs, query, Timestamp, where } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { PunchType } from '../enums/PunchType';
import { Punch } from '../models/Punch';
import { PunchQuery } from '../models/PunchQuery';

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

    addDoc(this.punchCollection, punchDoc)
  }

  async getPunches() {
    let output: { [key: string]: PunchQuery } = {}
    const q = query(this.punchCollection, where('uid', '==', this.auth.currentUser?.uid!))
    const snapshot = await getDocs(q)
    snapshot.forEach(doc => {
      output[doc.id] = (doc.data() as PunchQuery)
    })
  }

}
