import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next:(param)=>{
        if(!param['authenticated']){
          this.router.navigate(['/login']);
        }
      }
    });
  }

}
