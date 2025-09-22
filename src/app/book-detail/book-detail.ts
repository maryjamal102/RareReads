import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../book';
import { CartService } from '../cart';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetailComponent implements OnInit {
  book: any;
  quantity = 1;
  selectedQuantity: number = 1;

loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: Book,
    private cart: CartService
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(bookId!).subscribe(data => {
      this.book = data;
      this.loading = false;
    },
    error=> {
        console.error(error);
        this.loading = false;
    });
  }

  addToCart(book: any, quantity: number = 1): void {
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(item => item.id === book.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...book, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
    const bookData: any= {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(', ') || 'Unknown',
      price: book?.saleInfo?.listPrice?.amount || 'N/A',
      image: book.volumeInfo.imageLinks?.thumbnail || 'assets/fallback.jpg',
      quantity: quantity
    };
    this.cart.addToCart(book);
  }

  stripHtmlTags(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

}
