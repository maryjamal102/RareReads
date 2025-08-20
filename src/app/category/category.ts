import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { CartService } from '../cart';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookSeach } from '../book-seach';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit{
categories: string[] = ['bestseller','Fiction', 'History', 'Science', 'Romance', 'Mystery', 'Fantasy', 'literature', 'Comedy', 'Education', 'Novel', 'Horror'];
  books: any[] = [];
  allBooks: any[] = [];
  searchTerm = '';
  showCategoryButtons = true;
  selectedCategory: string = '';
  loading: boolean = false;
  categorySelected: boolean = false;

  constructor(private bookService: Book, private cart: CartService, private router: Router, private bookSearch: BookSeach) {}

ngOnInit(): void {
  this.bookSearch.searchTerm$.subscribe(term => {
      this.searchTerm = term.toLowerCase();

      if (term && term.trim() !== '') {
        this.showCategoryButtons = false; 
        this.bookService.getBooksByCategory(term).subscribe(data => {
          this.books = data.items || [];
        });
      } else {
        this.showCategoryButtons = true;
        this.books = [...this.allBooks];
      }
});
this.loadRandomBooks();
}

loadRandomBooks(): void {
  const randomTerms = ['bestseller', 'classic', 'adventure', 'literature', 'novel'];
  const randomTerm = randomTerms[Math.floor(Math.random() * randomTerms.length)];
  
  this.bookService.getBooksByCategory(randomTerm).subscribe(data => {
    this.books = data.items || [];
    this.allBooks = [...this.books]; 
  });
}


  selectCategory(category: string): void {
    this.categorySelected = true;
    this.loading = true;
    this.bookService.getBooksByCategory(category).subscribe(data => {
      this.books = data.items || [];
      this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
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

  viewBookDetails(book: any) {
  this.router.navigate(['/book', book.id]);
  }
}
