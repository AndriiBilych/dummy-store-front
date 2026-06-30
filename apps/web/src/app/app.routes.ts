import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./products/product-list').then((m) => m.ProductList),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart').then((m) => m.Cart),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/checkout').then((m) => m.Checkout),
  },
  { path: '**', redirectTo: '' },
];
