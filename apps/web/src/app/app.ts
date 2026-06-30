import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly cart = inject(CartService);
  protected readonly title = 'Dummy Store';
}
