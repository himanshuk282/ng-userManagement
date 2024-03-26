import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  constructor(private route:ActivatedRoute,private router:Router,private authService:AuthService){}
  // ngOnInit(): void {
  //   const appUser = this.authService.currentUserSig();
  //   if(appUser == undefined){
  //     console.log("User is undefined.");
  //   }
  //   if(appUser == null){
  //     console.log("user is null");
  //   }
  //   console.log(appUser?.email +"  "+appUser?.username);
  // }
  logout(){
    this.authService.logout().subscribe({
      next:()=>{
        this.router.navigateByUrl('/login')
      }
    })
  }

}
