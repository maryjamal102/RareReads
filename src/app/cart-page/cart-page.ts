import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart';
import { Subscription } from 'rxjs'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})

export class CartPage{
  cartItems: any[] = [];
  router = inject(Router);
  private subscription!: Subscription

  constructor(private cartService:CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
    this.cartItems = items});
    const storedCart = localStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

    updateQuantity(bookId: string, quantity: number): void {
    if (quantity < 1) return;

    const item = this.cartItems.find(b => b.id === bookId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  removeItem(bookId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== bookId);
    this.cartService.removeFromCart(bookId);
    this.saveCart();
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((acc, item) => {
      const price = item?.saleInfo?.listPrice?.amount || 0;
      return acc + price * item.quantity;
    }, 0);
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

   getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  trackById(index: number, item: any) {
  return item.id;
}

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
  
}
