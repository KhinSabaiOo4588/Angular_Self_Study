import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  count = signal(0);

  inc() {
    this.count.update(oldValue => oldValue + 1);
  }

  dec() {
    this.count.update(oldValue => oldValue - 1);
  }

  reset(){
    this.count.set(0);
  }
}
