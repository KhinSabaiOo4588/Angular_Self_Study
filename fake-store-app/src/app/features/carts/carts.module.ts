import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartsRoutingModule } from './carts-routing.module';

@NgModule({
  declarations: [CartListComponent],
  imports: [CommonModule, CartsRoutingModule], // Routing module included
})
export class CartsModule {}
