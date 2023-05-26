import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GpidClient } from 'src/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {


  public clients: GpidClient[] = [];

  private baseUrl = 'http://localhost:8080/clients';

  constructor(private router: Router, private http: HttpClient) {
    this.getAll().forEach(clients => {
      this.clients = [];
      clients.forEach(c => {
        this.clients.push({
          id: c.id,
          sys_descr: c.sys_descr,
          deviceip: c.deviceip,
          consumption: c.consumption
        })
      })
    })
    
    this.poll();
    
  }

  public openClient(event: Event) {
    this.router.navigate(["client"]);
  }

  private poll() {
    setInterval(() => {
      this.getAll().forEach(clients => {
        this.clients = [];
        clients.forEach(c => {
          this.clients.push({
            id: c.id,
            sys_descr: c.sys_descr,
            deviceip: c.deviceip,
            consumption: c.consumption
          })
        })
      })
    }, 2000);
  }

  private getAll(): Observable<GpidClient[]> {
    return this.http.get<GpidClient[]>(this.baseUrl);
  }

}
