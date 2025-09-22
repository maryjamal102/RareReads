import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../book';
import { CartService } from '../cart';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BookSeach } from '../book-seach';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('bookSection') bookSection!: ElementRef;
  books: any[] = [];
  allBooks: any[] = [];
  private searchSub!: Subscription;

  isSearching = false;

  constructor(private bookService: Book, private cart: CartService, private router: Router, private bookSearch: BookSeach) {}

  ngOnInit(): void {
  this.bookSearch.searchTerm$.subscribe(term => {
    this.isSearching = !!term;
    if (this.isSearching) {
      this.bookService.getBooksByTitle(term).subscribe(data => {
        this.books = data.items || [];
      });
    } else {
      this.loadRandomBooks();
    }
  });

  this.loadRandomBooks(); 
}


loadRandomBooks(): void {
    const randomTerms = ['literature', 'fiction', 'art', 'novel', 'world', 'adventure', 'time', 'history'];
    const term = randomTerms[Math.floor(Math.random() * randomTerms.length)];

    this.bookService.getBooksByCategory(term).subscribe(data => {
      this.books = data.items || [];
    });
  }


  addToCart(book: any, quantity: number = 1): void {
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(item => item.id === book.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
    const bookData = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(', ') || 'Unknown',
      price: book?.saleInfo?.listPrice?.amount || 'N/A',
      image: book.volumeInfo.imageLinks?.thumbnail || 'assets/fallback.jpg'
    };
    this.cart.addToCart(book);
  }

  viewBookDetails(book: any): void {
  this.router.navigate(['/book', book.id]);
}

 ngOnDestroy(): void {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

  scrollToBooks() {
    this.bookSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
