import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globalpath } from './globalPath';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  private URL = Globalpath.global_path;
  private token = localStorage.getItem('token');
  private user: User;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8'});
  constructor( private http: HttpClient, private router: Router) { }

  login(credentials: {email:string, password: string}){
    let credential = {
      email: credentials.email,
      password: credentials.password
    }
    setTimeout(()=>{
      localStorage.setItem('token', 'ez56-ybjbbhj5635FD5FBj873nD36nd893');
      localStorage.setItem('user', '{"name":"Yassine","prenom":"Essaid"}');
      return true;
    }, 1500)
    return this.http.post(this.URL+'/api/Auth/login',JSON.stringify(credential), {headers:  this.headers}).pipe(map(
      (response: any) => {
        let data = response.data;
        if( data && data.auth_token){
          localStorage.setItem('token', data.auth_token);
          localStorage.setItem('user', JSON.stringify(data.user));
          return true;
        }
        else
          return false;
      }
    ));
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    if(localStorage.getItem('token') !== null)
      return true;
    return false;
  }
  get currentUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
}
export interface User {
  id: string,
    name: string,
    prenom: string,
    gsm: string,
    email: string,
    alertemail: string,
    password: string,
    type_user: number,
    id_org: string,
    id_site: string,
    id_capteur: string,
    createdOn: string
}