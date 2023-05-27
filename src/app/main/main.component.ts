import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GpidClient } from 'src/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartConfiguration, ChartData, ChartType, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
      this.pieChartData.labels = [];
      this.pieChartData.datasets[0].data = [];

      this.clients = [];
      clients.forEach(c => {
        this.clients.push({
          id: c.id,
          sys_descr: c.sys_descr,
          deviceip: c.deviceip,
          consumption: c.consumption
        })
        this.pieChartData.labels?.push(c.sys_descr);
        this.pieChartData.datasets[0].data.push(c.consumption);
      })
    this.chart?.update();

    })
    
    this.poll();
    
  }

  public openClient(event: Event) {
    this.router.navigate(["client"]);
  }

  private poll() {
    setInterval(() => {
      this.getAll().forEach(clients => {
        this.pieChartData.labels = [];
        this.pieChartData.datasets[0].data = [];
  
        this.clients = [];
        clients.forEach(c => {
          this.clients.push({
            id: c.id,
            sys_descr: c.sys_descr,
            deviceip: c.deviceip,
            consumption: c.consumption
          })
          this.pieChartData.labels?.push(c.sys_descr);
          this.pieChartData.datasets[0].data.push(c.consumption);
        })
      })
      console.log(this.pieChartData)
        this.chart?.update();

    }, 2000);
  }

  private getAll(): Observable<GpidClient[]> {
    return this.http.get<GpidClient[]>(this.baseUrl);
  }



/** CHART */


@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input("data") public data: GpidClient[] = [];

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ ],
    datasets: [ {
      data: [ ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push([ 'Line 1', 'Line 2', 'Line 3' ]);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }



}
