import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';
import { globalpath } from './gobalpath';


@Injectable()
export class CompteurService {

  //private API_URI.serverpath = "https://smarton.azurewebTransporteurs.net/api";
    //private API_URI.serverpath = "http://localhost:53816/api";
    private API_URI : any={};

  token = localStorage.getItem('token'); 
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' ,'Authorization':'Bearer ' +this.token });
  private options = { headers: this.headers };

  constructor(private http:HttpClient) 
  { 
    Object.assign(this.API_URI,globalpath);
  }

  AjouterCompteur(credentials): Observable<any> {
    return this.http.post(this.API_URI.serverpath + '/capteur', JSON.stringify(credentials), this.options);
  }
  AjouterIntervals(credentials): Observable<any> {
    return this.http.post(this.API_URI.serverpath + '/interval', JSON.stringify(credentials), this.options);
  }
  ModifierInterval(id, credentials): Observable<any> {
    return this.http.put(this.API_URI.serverpath + '/interval/' + id, JSON.stringify(credentials), this.options);
  }
  ModifierCompteur(id, credentials): Observable<any> {
    return this.http.put(this.API_URI.serverpath + '/capteur/' + id, JSON.stringify(credentials), this.options);
  }

  SupprimerCompteur(credentials): Observable<any> {
    return this.http.delete(this.API_URI.serverpath + '/capteur/' + credentials, this.options);
  }
  SupprimerInterval(credentials): Observable<any> {
    return this.http.delete(this.API_URI.serverpath + '/capteur/interval/' + credentials, this.options);
  }
  GetAllCompteur(): Observable<any> {
    return this.http.get(this.API_URI.serverpath + '/capteur', this.options).pipe(
      map((response: Response) => response.json()));
  }

  private handleError(error: Response) {
    return Observable.throw(error.json() || 'Internal Server error');
  }
  GetIntervalById(id): Observable<any> {
    return this.http.get(this.API_URI.serverpath + '/interval/' + id, this.options).pipe(       map((response: Response) => response));
  }
  GetCompteurById(id): Observable<any> {
    
    return this.http.get(this.API_URI.serverpath + '/capteur/' + id, this.options).pipe(       map((response: Response) => response));
  }
  GetCompteurByIdpres(id): Observable<any> {
    
    return this.http.get(this.API_URI.serverpath + '/capteur/presence/' + id, this.options).pipe(map((response: Response) => response));
  }
  GetCompteurByIdOrg(id): Observable<any> {
    //console.log(this.API_URI.serverpath + '/capteur/org/' + id);
    return this.http.get(this.API_URI.serverpath + '/capteur/org/' + id, this.options)
    .pipe(
      map((response: Response) => response.json()));
  }
  GetCompteurByIdSite(id): Observable<any> {
   // console.log(this.API_URI.serverpath + '/capteur/site/' + id);
    return this.http.get(this.API_URI.serverpath + '/capteur/site/' + id, this.options)
      .pipe(       map((response: Response) => response.json()));
  }
  
  GetCompteursByIdSite(id): Observable<any> {
   // console.log(this.API_URI.serverpath + '/capteur/site/' + id);
    return this.http.get(this.API_URI.serverpath + '/capteur/sites/' + id, this.options)
      .pipe(       map((response: Response) => response.json()));
  }
  GetCompteurByType(id,type): Observable<any> {
    return this.http.get(this.API_URI.serverpath + '/capteur/type/' + id+'/'+type, this.options)
      .pipe(       map((response: Response) => response.json()));
  }
}
