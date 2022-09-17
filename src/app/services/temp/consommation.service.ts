import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globalpath } from '../globalPath';
import { globalpath } from './gobalpath'

@Injectable()
export class ConsommationService {


  private API_URI = Globalpath.global_path;


  token = localStorage.getItem('token');
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.token });
  private options = { headers: this.headers };

  constructor(private http: HttpClient) {

  }


  GetAll(): Observable<any> {
    return this.http.get(this.API_URI + '/api/data', this.options)
      .pipe(map((response: Response) => response));
  }

  GetByIdCompteur(id, gte, lte, type): Observable<any> {
    //console.log(this.API_URI + '/api/data/'+type+'/' + id+"/" + gte+'/'+lte);
    return this.http.get(this.API_URI + '/api/data/' + type + '/' + id + "/" + gte + '/' + lte, this.options).pipe(map((response: Response) => response));
  }
  GetCurrentByIdCompteur(id, last, type): Observable<any> {
    // console.log(this.API_URI + '/api/data/current/'+type+'/' + id+"/" + last);
    return this.http.get(this.API_URI + '/api/data/current/' + type + '/' + id + "/" + last, this.options).pipe(map((response: Response) => response));
  }
  GetCurrentChaudiere(id, last): Observable<any> {
    // console.log(this.API_URI + '/api/data/current/'+type+'/' + id+"/" + last);
    return this.http.get(this.API_URI + '/api/data/currentChaudiere/' + id + "/" + last, this.options).pipe(map((response: Response) => response));
  }
  GetCurrentEauData(id, last): Observable<any> {
    // console.log(this.API_URI + '/api/data/current/'+type+'/' + id+"/" + last);
    return this.http.get(this.API_URI + '/api/data/LastEau/' + id + "/" + last, this.options).pipe(map((response: Response) => response));
  }
  GetLastEauBeat(id): Observable<any> {
    // console.log(this.API_URI + '/api/data/current/'+type+'/' + id+"/" + last);
    return this.http.get(this.API_URI + '/api/data/LastBeat/' + id, this.options).pipe(map((response: Response) => response));
  }

  GetSumByIdCompteur(id, gte, lte, type): Observable<any> {
    //console.log(this.API_URI + '/api/data/Sum/' + id+"/" + gte+'/'+lte);
    return this.http.get(this.API_URI + '/api/data/Sum/' + id + "/" + gte + '/' + lte, this.options).pipe(map((response: Response) => response));
  }
  GetLatence(id, credentials): Observable<any> {
    //console.log(this.API_URI + '/api/data/Satisfaction/' + id+"/" + gte+'/'+lte);
    return this.http.post(this.API_URI + '/api/data/Latence/' + id + "/", JSON.stringify(credentials), this.options).pipe(map((response: Response) => response));
  }
  GetOccupByIdCompteur(id, gte, lte): Observable<any> {
    //console.log(this.API_URI + '/api/data/Occupation/' + id+"/" + gte+'/'+lte);
    return this.http.get(this.API_URI + '/api/data/Occupation/' + id + "/" + gte + '/' + lte, this.options).pipe(map((response: Response) => response));
  }
  GetMoyByIdCompteur(id, gte, lte): Observable<any> {
    // console.log(this.API_URI + '/api/data/Moyenne/' + id+"/" + gte+'/'+lte);
    return this.http.get(this.API_URI + '/api/data/Moyenne/' + id + "/" + gte + '/' + lte, this.options).pipe(map((response: Response) => response));
  }
  GetMaxMinByIdCompteur(id, gte, lte): Observable<any> {
    return this.http.get(this.API_URI + '/api/data/MinMax/' + id + "/" + gte + '/' + lte, this.options).pipe(map((response: Response) => response));
  }
  GetMaxMinByIdChaudiere(id, gte, lte): Observable<any> {
    return this.http.get(this.API_URI + '/api/data/MinMaxChaudiere/' + id + "/" + gte + '/' + lte, this.options).pipe(map((response: Response) => response));
  }
  GetMoyenHexa(id, gte, lte): Observable<any> {
    return this.http.get(this.API_URI + '/api/data/Moyen/' + id + "/" + gte + '/' + lte, this.options).pipe(map((response: Response) => response));
  }

  GetSatisfactionByIdCompteur(id, gte, lte): Observable<any> {
    //console.log(this.API_URI + '/api/data/Satisfaction/' + id+"/" + gte+'/'+lte);
    return this.http.get(this.API_URI + '/api/data/Satisfaction/' + id + "/" + gte + '/' + lte, this.options).pipe(map((response: Response) => response));
  }
  GetChaudiere(id, credentials): Observable<any> {
    //console.log(this.API_URI + '/api/data/Satisfaction/' + id+"/" + gte+'/'+lte);
    return this.http.post(this.API_URI + '/api/data/Chaudiere/brute/' + id + "/", JSON.stringify(credentials), this.options).pipe(map((response: Response) => response));
  }
  GetServerBrute(id, credentials): Observable<any> {
    //console.log(this.API_URI + '/api/data/Satisfaction/' + id+"/" + gte+'/'+lte);
    return this.http.post(this.API_URI + '/api/data/Server/brute/' + id + "/", JSON.stringify(credentials), this.options).pipe(map((response: Response) => response));
  }
  GetChaudierebydate(id, credentials): Observable<any> {
    return this.http.post(this.API_URI + '/api/data/Chaudiere/' + id, JSON.stringify(credentials), this.options).pipe(map((response: Response) => response));
  }
  GetAlarmbydate(mac, credentials): Observable<any> {
    return this.http.post(this.API_URI + '/api/data/alarm/' + mac, JSON.stringify(credentials), this.options).pipe(map((response: Response) => response));
  }
  GetByIdSite(id): Observable<any> {
    return this.http.get(this.API_URI + '/api/data/Last/' + id, this.options)
      .pipe(map((response: Response) => response));
  }
  GetAlarms(mac): Observable<any> {
    return this.http.get(this.API_URI + '/api/data/alarm//' + mac, this.options)
      .pipe(map((response: Response) => response));
  }
  GetByDate(gt, lt): Observable<any> {
    //console.log(this.API_URI + '/api/data/date/' + gt+'/'+lt);
    return this.http.get(this.API_URI + '/api/data/date/' + gt + '/' + lt, this.options)
      .pipe(map((response: Response) => response));
  }

  GetCurrentBallonById(id): Observable<any> {
    //console.log(this.API_URI + '/api/data/date/' + gt+'/'+lt);
    return this.http.get(this.API_URI + '/api/Ballon/Current/' + id, this.options)
      .pipe(map((response: Response) => response));
  }
  GetCurrentSiloById(id): Observable<any> {
    //console.log(this.API_URI + '/api/data/date/' + gt+'/'+lt);
    return this.http.get(this.API_URI + '/api/Silo/Current/' + id, this.options)
      .pipe(map((response: Response) => response));
  }
  GetCurrentProdById(id): Observable<any> {
    //console.log(this.API_URI + '/api/data/date/' + gt+'/'+lt);
    return this.http.get(this.API_URI + '/api/Energy/Current/' + id, this.options)
      .pipe(map((response: Response) => response));
  }

  GetCurrentChaudiereById(id): Observable<any> {
    //console.log(this.API_URI + '/api/data/date/' + gt+'/'+lt);
    return this.http.get(this.API_URI + '/api/Data/currentChaudiere/'+id+'/1', this.options);
  }
}
