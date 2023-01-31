import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, Timestamp } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private firestore: Firestore) { }

  async createUser(uid: string, fullName: string, preferredName: string) {
    const docData = {
      fullName: fullName,
      preferredName: preferredName,
      added: Timestamp.fromMillis(Date.now())
    }

    return await setDoc(doc(this.firestore, "users", uid), docData)
  }


}
