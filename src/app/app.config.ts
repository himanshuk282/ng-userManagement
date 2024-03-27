import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../../src/environments/environment'

import {provideFirebaseApp,initializeApp} from '@angular/fire/app'
import {getAuth,provideAuth} from '@angular/fire/auth'
import {provideFirestore,getFirestore} from '@angular/fire/firestore'

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "ng-user-management-2b1df.firebaseapp.com",
  projectId: "ng-user-management-2b1df",
  storageBucket: "ng-user-management-2b1df.appspot.com",
  messagingSenderId: "905204268571",
  appId: "AppID"
}
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom([
    provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    provideAuth(()=>getAuth()),
    provideFirestore(()=>getFirestore())
  ])]
};
