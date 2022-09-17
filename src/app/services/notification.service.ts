import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Globalpath } from './globalPath';
import { Injectable } from '@angular/core';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = Globalpath.global_path;
  private token = localStorage.getItem('token');
  private user: User = JSON.parse(localStorage.getItem('user'));
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' ,'Authorization':'Bearer '+this.token});

  constructor(private http: HttpClient) { }
  getNotification(){
    return this.http.get(this.url+'/api/Notification/user/'+this.user.id,{headers: this.headers});
  }
  getAlertes(){
    return this.http.get(this.url+'/api/Notification/Alertes/'+this.user.id,{headers: this.headers});
  }
}
