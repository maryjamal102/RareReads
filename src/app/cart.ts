import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = this.loadCart();
  private cartSubject = new BehaviorSubject<any[]>(this.loadCart());
  cartItems$ = this.cartSubject.asObservable();

  private cartCount = new BehaviorSubject<number>(this.getCartItems().reduce((acc, item) => acc + item.quantity, 0));
cartCount$ = this.cartCount.asObservable();

private calculateTotalCount(): number {
  return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
}


  constructor() {}

  private updateCartState() {
  this.cartSubject.next(this.cartItems);
  this.cartCount.next(this.calculateTotalCount());
  this.saveCart(this.cartItems);
}


  private loadCart(): any[] {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  }

  private saveCart(items: any[]) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

  getCartItems(): any[] {
    return this.cartSubject.getValue();
  }

  addToCart(book: any): void {
    console.log('Adding to cart:', book);
  const existing = this.cartItems.find((item) => item.id === book.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    this.cartItems.push({ ...book, quantity: 1 });
  }
  console.log('Cart now:', this.cartItems);
  this.updateCartState();
}

  removeFromCart(bookId: string): void {
  this.cartItems = this.cartItems.filter((item) => item.id !== bookId);
  console.log('Cart after removal:', this.cartItems);
  this.updateCartState();
  if (this.cartItems.length === 0) {
  this.cartCount.next(0);
}

}


 updateQuantity(bookId: string, newQuantity: number): void {
  const item = this.cartItems.find(b => b.id === bookId);
  if (item) {
    item.quantity = newQuantity;
  }
  this.updateCartState();
}



  clearCart(): void {
  this.cartItems = [];
  this.updateCartState();
  }
}
