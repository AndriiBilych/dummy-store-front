import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CartItem, Product } from '../models/product';

const STORAGE_KEY = 'dummy-store-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _items = signal<CartItem[]>(this.load());

  readonly items = this._items.asReadonly();
  readonly count = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );
  readonly total = computed(() =>
    this._items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  constructor() {
    effect(() => {
      const items = this._items();
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    });
  }

  add(product: Product): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  setQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this._items.update((items) =>
      items.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }

  remove(productId: number): void {
    this._items.update((items) =>
      items.filter((i) => i.product.id !== productId)
    );
  }

  clear(): void {
    this._items.set([]);
  }

  private load(): CartItem[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
