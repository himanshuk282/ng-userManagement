import { Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebaseAuth:Auth) { }
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(email:string,password:string,username:string):Observable<void>{
    const promise = createUserWithEmailAndPassword(this.firebaseAuth,email,password).then(
      (response)=>updateProfile(response.user,{displayName:username})
    );

    return from(promise);

  }
  login(email:string,password:string):Observable<void>{
    const promise = signInWithEmailAndPassword(this.firebaseAuth,email,password).then(()=>{});
    return from(promise);
  }
  logout(){
    const promise = signOut(this.firebaseAuth).then(()=>{
      this.currentUserSig.set(null);
    });
    return from(promise);
  }
}
