import { Globalpath } from './globalPath';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.service';

@Injectable()
export class AccessService {

  private URL = Globalpath.global_path;
  private token = localStorage.getItem('token');
  private user: User = JSON.parse(localStorage.getItem('user'));
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' ,'Authorization':'Bearer ' +this.token });

  constructor(private http: HttpClient) { }

  GetInfo(){
    return this.http.get(this.URL+'/api/User/UserAccessList/'+this.user.id_site, {
      headers: this.headers
    });
  }
  modifyUser(id, list){
    return this.http.put(this.URL+'/api/User/Access/'+id, list,{
      headers: this.headers
    });
  }
}
