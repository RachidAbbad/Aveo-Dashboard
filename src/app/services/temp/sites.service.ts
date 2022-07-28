import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';
import { globalpath } from './gobalpath';

@Injectable()
export class SitesService {

    //private API_URI.serverpath = "https://smarton.azurewebTransporteurs.net/api";
    //private API_URI.serverpath = "http://localhost:53816/api";
    private API_URI :any={};
    token = localStorage.getItem('token'); 
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' ,'Authorization':'Bearer ' +this.token });
    private options = { headers: this.headers };
  
    constructor(private http:HttpClient) 
    { 
        this.API_URI = Object.assign(this,globalpath);
    }

    

    getAll(): Observable<any> {
        return this.http.get(this.API_URI.serverpath + '/site', this.options).pipe( map((response: Response) => response.json()));
    }

    getSiteById(id): Observable<any> {
        return this.http.get(this.API_URI.serverpath + '/site/' + id, this.options).pipe( map((response: Response) => response.json()));
    }

    postSite(id,obj): Observable<any> {
        return this.http.post(this.API_URI.serverpath + '/site/'+id, JSON.stringify(obj), this.options);
    }

    putSite(id, obj): Observable<any> {
        return this.http.put(this.API_URI.serverpath + '/site/' + id, JSON.stringify(obj), this.options);
    }

    deleteSite(id): Observable<any> {
        return this.http.delete(this.API_URI.serverpath + '/site/'+id, this.options);
    }

    putHyrSites(obj): Observable<any> {
        return this.http.put(this.API_URI.serverpath + '/site/hyr', JSON.stringify(obj), this.options);
    }
    
    getListSiteNameFromParent(id): Observable<any> {
        return this.http.get(this.API_URI.serverpath + '/site/list/' + id, this.options).pipe( map((response: Response) => response.json()));
    }
}