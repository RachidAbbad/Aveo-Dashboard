import { element } from 'protractor';
import { Intervention } from './../interventions/interventions.component';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Globalpath } from './globalPath';
import { Injectable } from '@angular/core';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  private url = Globalpath.global_path;
  private token = localStorage.getItem('token');
  private user: User = JSON.parse(localStorage.getItem('user'));
  private intervention: Intervention;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' ,'Authorization':'Bearer ' +this.token });

  constructor(private http: HttpClient, private router: Router) { }

  getInterventions(){
    return this.http.get(this.url+'/api/Intervention',{headers: this.headers});
  }
  getInterventionsbyID(id){
    return this.http.get(this.url+'/api/Intervention/'+id,{headers: this.headers});
  }
  getSite(){
    return this.http.get(this.url+'/api/Dashboard/'+this.user.id_site, {headers: this.headers});
  }
  getResponsable(){
    return this.http.get(this.url+'/api/User/org/'+this.user.id_site, {headers: this.headers});
  }
  getRapports(){
    // Site/'+'5fbccf26e06d8cb8a4ac500e'
    return this.http.get(this.url+'/api/Rapport/', {headers: this.headers});
  }
  addIntervention(body){
    return this.http.post(this.url+'/api/Intervention',JSON.stringify(body), {headers: this.headers});
  }
  modifyIntervention(id, body){
    return this.http.put(this.url+'/api/Intervention/'+id, JSON.stringify(body), {headers: this.headers}).subscribe();
  }
  modifyInterventionetat(id, body){
    return this.http.put(this.url+'/api/Intervention/etat/'+id, JSON.stringify(body), {headers: this.headers}).subscribe();
  }
  validateRapport(state, row){
    // if(state == false){
    //   this.setIntervention(row);
    //   this.router.navigate(['/home/ajouterIntervention']);
    // }
    return this.http.put(this.url+'/api/Rapport/Etat/'+row.id, state, {headers: this.headers}).subscribe();
    
  }
  getInterventionInterval(site: string,from : string, to : string){
    return this.http.get(this.url+'/api/Intervention/SiteDate/'+ site+'/'+from.replace(/:/g,"c")+'/'+to.replace(/:/g,"c"), {headers: this.headers});
  }
  getTechnicien(){
    return this.http.get(this.url+ '/api/User', {headers: this.headers});
  }
  getInterventionID(id_site, id_tech, etat, type){
    return this.http.get(this.url+ '/api/Intervention/Filtre/'+ id_site+'/'+id_tech+'/'+etat+'/'+type, {headers: this.headers});
  }
  getTechnicianAvailable(id_site: string,from : string, to : string){
    return this.http.get(this.url+'/api/Intervention/Disponible/'+ id_site +'/'+from.replace(/:/g,"c")+'/'+to.replace(/:/g,"c"), {headers: this.headers});
  }
  setIntervention(element){
    this.intervention=element;
  }
  deleteIntervention(id){
    return this.http.delete(this.url+'/api/Intervention/'+ id, {headers: this.headers}).subscribe();
  }
  get getIntervention(){
    let inter = this.intervention;
    this.intervention = null;
    return inter;
  }


}
