import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import {LoginService} from './services/login.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService:LoginService,private router:Router) { }


  canActivate():boolean{
  if(this.loginService.checkSessionStorage()){
    return true
  }
  else{

    this.router.navigate(['/'])
    return false
  }
  }
}
