import { Component } from '@angular/core';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css']
})
export class StylesComponent {
  value = 100;

  changeRange(value: string): void {
    this.value = Number(value); 
  }

  targetStyle = {
    height: '100px',
    'background-color': 'grey'
  }
}
