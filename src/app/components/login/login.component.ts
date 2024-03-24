import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isUserValid:boolean = false;
  formDefaults:any = {
    email:'Enter email',
    password:'Enter password'
  }
  formError:any = {
    emailNotFound:'Please check email entered. User not present.',
    passwordNotMatch:'Please enter a valid password',
    emailReq: 'Email is a required field',
    emailFormat: 'Email is a invalid',
    passReq: 'Password is a required field',
    success: 'User login successfull'
  }
  constructor(private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null,[
        Validators.required
      ])
    });
  }
  onSubmit(){
    const user = localStorage.getItem(this.loginForm.value?.email);
    if(user != null){
      //User present and check for password;
      const userDetail = JSON.parse(user);
      if(this.loginForm.value.password == userDetail.password){
        //Match
        this.isUserValid = true;
        this.router.navigate(['../home'],{
          queryParams:{
            authenticated: this.isUserValid
          }
        });
      }
      else{
        alert("Error: "+this.formError.passwordNotMatch);
      }
    }
    else{
      //user not present
      alert("Error: "+ this.formError.emailNotFound);
    }
  }
}
