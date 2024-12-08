import { Component, ElementRef, ViewChild } from '@angular/core';
import { routes } from '../views/views-routing.module';
import { Router, RouterModule } from '@angular/router';
import lottie from 'lottie-web';
@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css',
  standalone: true,
  imports: [RouterModule]
})
export class ErrorsComponent {
  constructor(private router: Router) {
    
  }
  @ViewChild('lottieContainer') lottieContainer!: ElementRef;
  ngAfterViewInit() {
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement,
      path: 'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
  }
   
  
}