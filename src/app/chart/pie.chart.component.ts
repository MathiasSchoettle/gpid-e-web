import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GpidClient } from 'src/types';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie.chart.component.html',
  styleUrls: [ './pie.chart.component.less' ]
})
export class PieChartComponent  implements AfterViewInit {
  
  ngAfterViewInit(): void {
    // do your magic!
    console.log("");
  }
  
  ngOnInit(): void {
    
  }
}