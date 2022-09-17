import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';
import { globalpath } from './gobalpath';
import { Globalpath } from '../globalPath';


@Injectable()
export class CompteurService {

  //private URL = "https://smarton.azurewebTransporteurs.net/api";
    //private API_URI.serverpath = "http://localhost:53816/api";
 private URL = Globalpath.global_path;

  token = localStorage.getItem('token'); 
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' ,'Authorization':'Bearer ' +this.token });
  private options = { headers: this.headers };

  constructor(private http:HttpClient) 
  { 
  }

  AjouterCompteur(credentials): Observable<any> {
    return this.http.post(this.URL + '/api/capteur', JSON.stringify(credentials), this.options);
  }
  AjouterIntervals(credentials): Observable<any> {
    return this.http.post(this.URL + '/api/interval', JSON.stringify(credentials), this.options);
  }
  ModifierInterval(id, credentials): Observable<any> {
    return this.http.put(this.URL + '/api/interval/' + id, JSON.stringify(credentials), this.options);
  }
  ModifierCompteur(id, credentials): Observable<any> {
    return this.http.put(this.URL + '/api/capteur/' + id, JSON.stringify(credentials), this.options);
  }

  SupprimerCompteur(credentials): Observable<any> {
    return this.http.delete(this.URL + '/api/capteur/' + credentials, this.options);
  }
  SupprimerInterval(credentials): Observable<any> {
    return this.http.delete(this.URL + '/api/capteur/interval/' + credentials, this.options);
  }
  GetAllCompteur(): Observable<any> {
    return this.http.get(this.URL + '/api/capteur', this.options).pipe(
      map((response: Response) => response.json()));
  }

  private handleError(error: Response) {
    return Observable.throw(error.json() || 'Internal Server error');
  }
  GetIntervalById(id): Observable<any> {
    return this.http.get(this.URL + '/api/interval/' + id, this.options).pipe(       map((response: Response) => response));
  }
  GetCompteurById(id): Observable<any> {
    
    return this.http.get(this.URL + '/api/capteur/' + id, this.options).pipe(       map((response: Response) => response));
  }
  GetCompteurByIdpres(id): Observable<any> {
    
    return this.http.get(this.URL + '/api/capteur/presence/' + id, this.options).pipe(map((response: Response) => response));
  }
  GetCompteurByIdOrg(id): Observable<any> {
    //console.log(this.URL + '/capteur/org/' + id);
    return this.http.get(this.URL + '/api/capteur/org/' + id, this.options)
    .pipe(
      map((response: Response) => response.json()));
  }
  GetCompteurByIdSite(id): Observable<any> {
   // console.log(this.URL + '/capteur/site/' + id);
    return this.http.get(this.URL + '/api/capteur/site/' + id, this.options)
      .pipe(       map((response: Response) => response.json()));
  }
  
  GetCompteursByIdSite(id): Observable<any> {
   // console.log(this.API_URI.serverpath + '/capteur/site/' + id);
    return this.http.get(this.URL + '/api/capteur/sites/' + id, this.options)
      .pipe(       map((response: Response) => response.json()));
  }
  GetCompteurByType(id,type): Observable<any> {
    return this.http.get(this.URL + '/api/capteur/type/' + id+'/'+type, this.options)
      .pipe(       map((response: Response) => response.json()));
  }
}
