import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Access-Control-Allow-Origin': '*' });
  constructor(private http: HttpClient) { }

  getLastImages(){
    return this.http.get('http://rachidabbad-001-site1.gtempurl.com/api/images/last', {
      headers: this.headers
    });
  }
  getAllImages(){
    return this.http.get('http://rachidabbad-001-site1.gtempurl.com/api/images/all',
    {
      headers: this.headers
    });
  }
}
