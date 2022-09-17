import { Globalpath } from './globalPath';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EtatMarcheService {
  private URL = Globalpath.global_path;
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' ,'Authorization':'Bearer ' +this.token });

  constructor(private http: HttpClient) { }
  GetInfo(){
    return this.http.get('/api/dashboard', {
      headers: this.headers
    });
  }
}
