import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() title!:string;
  authService = inject(AuthService);
  router = inject(Router);
  
  ngOnInit(): void {
    this.authService.user$.subscribe((user) =>{
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username:user.displayName!,
        })
      }
      else{
        this.authService.currentUserSig.set(null);
      }
    })
  }
  
  logout(){
    this.authService.logout().subscribe({
      next:()=>{
        this.router.navigateByUrl("/login");
      },
      error:(error)=>{
        alert("Error in logout : "+error.code);
      }
    });
  }
}
