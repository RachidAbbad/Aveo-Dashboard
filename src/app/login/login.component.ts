import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {faMicrosoft} from '@fortawesome/free-brands-svg-icons'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginFail = false;
  form = new FormGroup({
    email: new FormControl('',Validators.email),
    password: new FormControl('',Validators.required)
  });
  constructor( private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if(this.userService.isLoggedIn())
      this.router.navigate(['home/dashboard']);
  }
  
  login() {
    this.userService.login(this.form.value).subscribe(result => {
        if(result){
          this.router.navigate(['home/dashboard']);
        }
        else
          this.isLoginFail = true;
        
      }
    );
}
}
