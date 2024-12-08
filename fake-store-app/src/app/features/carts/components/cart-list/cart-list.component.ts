import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  carts: any[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.carts = await this.apiService.get('carts');
  }
}
