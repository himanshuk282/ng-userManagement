import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    {path:'home',component:HomeComponent,canActivate:[authGuardGuard]},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'',component:HomeComponent,pathMatch:'full'},
    {path:'**',component:NotfoundComponent}
];
