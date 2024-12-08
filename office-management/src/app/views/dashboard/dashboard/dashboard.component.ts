/* moeminoo */

import { Component } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { curveBasis } from 'd3-shape';


@Component({
  selector: 'app-dashboard',
  imports: [NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent {

  
  view: [number, number] = [500, 300];
  viewSmall: [number, number] = [350, 200];
  curveBasis = curveBasis;
  
  // Options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = false;
  autoScale: boolean = true;

  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Value';

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#7366FF', '#FF7782', '#4C3BCF', '#4B70F5']
  };

  colorSchemeForPie: Color = {
    name: 'pieScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#7366FF', '#FF7782', '#4C3BCF', '#4B70F5']
  };

  cards = [
    { title: 'Total Projects', value: 2050 },
    { title: 'Total Deps', value: 3250 },
    { title: 'Total Employees', value: '87.5%' },
    { title: 'New Users', value: 2550 }
  ];

  chartIcons = [
    `https://media.istockphoto.com/id/1459735609/photo/circle-diagram-graph-icon-simple-3d-render-illustration.jpg?s=612x612&w=0&k=20&c=Cj3HZ-V1baRIle9eon2Q1KS3Im1a2duaCCr1OxVsslQ=`,
    'https://media.istockphoto.com/id/1193548693/vector/increase.jpg?s=612x612&w=0&k=20&c=XZ72T9hQTmLvOlKLligIEMpIrA8phdWrSe-UkGS3h9o='
  ];

  getChartIcon(index: number): string {
    return this.chartIcons[index % this.chartIcons.length];
  }

  waveData: any[] = [
    {
      name: "iPhone",
      series: this.generateSeriesData()
    },
    {
      name: "Samsung",
      series: this.generateSeriesData()
    },
    {
      name: "Redmi",
      series: this.generateSeriesData()
    }
  ];

  filteredWaveData: any[] = this.waveData;

  deviceData: any[] = [
    {
      name: 'Desktop',
      value: 70281
    },
    {
      name: 'Mobile',
      value: 18234
    },
    {
      name: 'Tablet',
      value: 8920
    },
    {
      name: 'Others',
      value: 231
    }
  ];

  countryData: any[] = [
    {
      name: 'USA',
      value: 6400
    },
    {
      name: 'Germany',
      value: 5000
    },
    {
      name: 'France',
      value: 4000
    },
    {
      name: 'UK',
      value: 3800
    },
    {
      name: 'Myanmar',
      value: 6200
    },
    {
      name: 'Paris',
      value: 2000
    },
    {
      name: 'Htai',
      value: 8000
    },
    {
      name: 'Korea',
      value: 3500
    },
    {
      name: 'Japan',
      value: 1200
    }
  ];

  trafficSourceData: any[] = [
    {
      name: 'Chrome',
      sessions: 22180,
      bounceRate: '39.21%',
      traffic: 36213
    },
    {
      name: 'Firefox',
      sessions: 16124,
      bounceRate: '45.27%',
      traffic: 31170
    },
    {
      name: 'Edge',
      sessions: 26346,
      bounceRate: '28.62%',
      traffic: 20126
    },
    {
      name: 'Opera',
      sessions: 22180,
      bounceRate: '39.21%',
      traffic: 36213
    },
    {
      name: 'Brave',
      sessions: 16124,
      bounceRate: '45.27%',
      traffic: 31170
    }
  ];

  profileImage: string = 'https://media.istockphoto.com/id/1875856344/photo/thoughtful-man-with-finger-touching-face.jpg?s=612x612&w=0&k=20&c=8opQaEr30C1IBc68270A5r3aViel7i_fVt6yBYUZRJc=';
  profileName: string = 'John';
  profileDepartment: string = 'Sales';
  profilePosition: string = 'Manager';

  generateSeriesData() {
    const series = [];
    for (let i = 0; i <= 12; i++) {
      series.push({
        name: i.toString(),
        value: Math.floor(20 + Math.random() * 60)
      });
    }
    return series;
  }

  onFilterChange(event: any) {
    const selectedValue = event.target.value;

    if (selectedValue === 'All') {
      this.filteredWaveData = this.waveData;
    } else {
      this.filteredWaveData = this.waveData.filter(data => data.name === selectedValue);
    }
  }

  
  viewProfile(){

  }
  
  chatWithHim(){

  }

}
