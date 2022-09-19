import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globalpath } from './globalPath';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { stringify } from 'querystring';

@Injectable()
export class UserService {
  private URL = Globalpath.global_path;
  private token = localStorage.getItem('token');
  private user: User;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization':'Bearer '+this.token});
  constructor( private http: HttpClient, private router: Router) { }

  login(credentials: {email:string, password: string}){
    let credential = {
      email: credentials.email,
      password: credentials.password
    }
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

  getPeriodicities() {
    return [{
      "id": "63187acff039a3ab94276950",
      "value": "Quotidien"
    },{
      "id": "63187b2bf039a3ab9427695f",
      "value": "Mensuel"
    },{
      "id": "631f79838eac18d6e07bc06b",
      "value": "Hebdomadaire"
    },{
      "id": "631f79d58eac18d6e07bc06c",
      "value": "Annuel"
    }];
  }

  getUserPeriodicities(){
    let id_user = JSON.parse(localStorage.getItem('user')).id;
    return this.http.get(this.URL+'/api/User/Periodicitie/'+id_user,{headers:  this.headers})
  }

  saveUserPeriodicities(periodicities: Array<string>){
    let id_user = JSON.parse(localStorage.getItem('user')).id;
    return this.http.put(this.URL+'/api/User/Periodicitie/'+id_user,JSON.stringify(periodicities),{headers:  this.headers})
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