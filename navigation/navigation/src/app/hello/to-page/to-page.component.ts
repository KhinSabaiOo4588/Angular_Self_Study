import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-page',
  templateUrl: './to-page.component.html',
  styleUrls: ['./to-page.component.css']
})
export class ToPageComponent {
    constructor(private router:Router){}

    goBack(){
        this.router.navigate(['/hello'])
    }
}
