import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  protected readonly cart = inject(CartService);
  protected readonly placed = signal(false);

  protected readonly form = {
    name: '',
    email: '',
    address: '',
    card: '',
  };

  placeOrder(): void {
    this.placed.set(true);
    this.cart.clear();
  }
}
