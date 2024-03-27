import { Injectable } from '@angular/core';
import { getFirestore,doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { User } from '../models/user-details.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db?:any;
  constructor() { 
    this.db = getFirestore();
  }

  async addUserDetails(user:User){
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(this.db, "user_details"), {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth
    });
    return docRef.id;
  }
}
