import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/types';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {

  public clients: Client[] = [
    { name: "Topfpflanze", usage: 3 },
    { name: "Yanniks Latop", usage: 24 },
    { name: "Majas Gaming Rig", usage: 653 },
    { name: "Waschmaschine", usage: 587 },
  ]

  constructor(private router: Router) {}

  public openClient(event: Event) {
    this.router.navigate(["client"]);
  }
}
