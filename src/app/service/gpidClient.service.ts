import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GpidClient } from 'src/types';


@Injectable({
  providedIn: 'root'
})
export class GpidClientService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<GpidClient[]> {
    return this.http.get<GpidClient[]>(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<GpidClient[]> {
    return this.http.get<GpidClient[]>(`${baseUrl}?title=${title}`);
  }
}
