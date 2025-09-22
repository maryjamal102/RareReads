import { Component, Input } from '@angular/core';
import { CartService } from '../cart'; 

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
@Input() book: any;

  constructor(private cartService:CartService) {}

  addToCart() {
    this.cartService.addToCart(this.book);
  }
}
