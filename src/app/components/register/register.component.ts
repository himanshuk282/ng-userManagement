import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private authService:AuthService,private router:Router){}
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
  errorMessage: string | null = null;
  onSubmit(){
    const rawForm = this.registerForm.value;
    this.authService.register(rawForm.email,rawForm.password,rawForm.firstName).subscribe({
      next:()=>{
        this.router.navigateByUrl('/home');
      },
      error:(error)=>{
        this.errorMessage = error.code;
        alert("Error message: "+error.code);
      }
    })
  }
  onReset(){
    this.registerForm.reset();
  }
}