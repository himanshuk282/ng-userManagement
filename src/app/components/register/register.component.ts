import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  defaultFormState:User = {
    'firstName':'Enter firstname',
    'lastName':'Enter lastname',
    'email':'Enter email',
    'password':'',
    'dateOfBirth': '',
    'gender': 'male'

  }
  registerationErrorMessage:any={
    firstNameRequired:'FirstName is a required field.',
    lastNameRequired:'LastName is a required field.',
    emailRequired:'Email is a required field.',
    emailFormat:'Email format is invalid.',
    dobRequired:'Date of Birth is a required field.',
    genderRequired:'Gender is a required field.',
    passwordRequired:'Password is a required field.',
  }
  registerForm!:FormGroup;
  ngOnInit(): void {
    const now = new Date();
    this.registerForm = new FormGroup({
      firstName: new FormControl('',[
        Validators.required
      ]),
      lastName: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      dateOfBirth: new FormControl(now.toLocaleDateString()),
      gender: new FormControl(this.defaultFormState.gender,[
        Validators.required
      ]),
      password: new FormControl(null,[
        Validators.required
      ])
    });
  }
  onSubmit(){
    //User can be stored in the database or anyplace else
    //We can store them in localStorage
    const isUserPresent = localStorage.getItem(this.registerForm.value?.email);
    if(isUserPresent != null){
      //User Already present
      //We can provision update here
      //We will not allow the user to update
      alert("User is already present. Please contact admin.");
    }else{
      localStorage.setItem(this.registerForm.value?.email,JSON.stringify(this.registerForm.value));
      this.registerForm.setValue(this.defaultFormState);
      alert("User successfully added!");
    }
  }
  onReset(){
    this.registerForm.reset();
  }
}