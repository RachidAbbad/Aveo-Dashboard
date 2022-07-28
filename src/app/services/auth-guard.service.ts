import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(){
    //This is for demo purposes :
    return true;
    if(this.userService.isLoggedIn()){
    return true;
  }
  else{
    this.router.navigate(['/']);
    return false;
  }
  }
}
