import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AboutUsComponent {
  teamMembers = [
    { image: 'boy.png', name: 'Han Naung Soe', description: 'Full Stack Developer(OJT)' },
    { image: 'moe.jpg', name: 'Moe Min Oo', description: 'Full Stack Developer(OJT)' },
    { image: 'boy.png', name: 'Myo Thu Aung', description: 'Full Stack Developer(OJT)' },
    { image: 'tto.jpg', name: 'Thin Thin Oo', description: 'Full Stack Developer(OJT)' },
    { image: 'kso.jpg', name: 'Khin Sabai Oo', description: 'Full Stack Developer(OJT)' },
  ];
}
