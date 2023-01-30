import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';
import { Observable } from "rxjs"


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeCollection = collection(this.firestore, 'employees')

  constructor(private firestore: Firestore) { }


  getEmployees(): Observable<DocumentData[]> {
    return collectionData(this.employeeCollection)
  }
}
