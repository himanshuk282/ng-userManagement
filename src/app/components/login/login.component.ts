import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
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
    const rawForm = this.loginForm.value;
    this.authService.login(rawForm.email,rawForm.password).subscribe({
      next: ()=>{
        this.router.navigateByUrl('/home');
      },
      error:(error)=>{
        alert("Error in login: " + error.code);
      }
    })

  }
}
