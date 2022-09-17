import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Globalpath } from './globalPath';
import { Injectable } from '@angular/core';
import { Regle } from '../regles/regles.component';

@Injectable({
  providedIn: 'root'
})
export class RegleService {
  
  private url = Globalpath.global_path;
  private token = localStorage.getItem('token');
  private user = JSON.parse(localStorage.getItem('user'));
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' ,'Authorization':'Bearer ' +this.token });

  constructor(private http: HttpClient, private router: Router) { }

  getRegle(){
    return this.http.get(this.url+'/api/Regle',{headers: this.headers});
  }
  getSenseur(valeur, id_site){
    return this.http.get(this.url+'/api/Capteur/siteType/'+id_site+ '/'+ valeur, {headers: this.headers});
  }
  getSite(){
    return this.http.get(this.url+'/api/Dashboard/'+this.user.id_site, {headers: this.headers});
  }
  switchActive(id: string, active: boolean){
    return this.http.put(this.url+'/api/Regle/isactive/'+id,JSON.stringify(active),{headers: this.headers}).subscribe();
  }
  deleteRegle(id:string){
    return this.http.delete(this.url+'/api/Regle/'+id,{headers: this.headers}).subscribe();
  }
  addRegle(regle){
    return this.http.post(this.url+'/api/Regle/', regle, {headers: this.headers}).subscribe(()=>{});
  }
  modifyRegle(id, regle){
    return this.http.put(this.url+'/api/Regle/'+id, regle, {headers: this.headers}).subscribe(()=>{});
  }
}
