import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { Weather } from './weather/weather';
import { authGuardGuard, publicGuardGuard } from './guard/auth-guard-guard';



export const routes: Routes = [

    { path: 'home', component: Home },
    { path: 'register', component: Register, canActivate: [publicGuardGuard] }, //route can only be accessed by the public i.e unauthenticated users
    { path: 'login', component: Login, canActivate: [publicGuardGuard]  },
    { path: 'weather', component: Weather, canActivate: [authGuardGuard] }, // route can only be accessed by authenticaetd users

    {path: '**', redirectTo: '/home'}

];
