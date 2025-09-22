import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../cart';
import { BookSeach } from '../book-seach';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../book';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
@Output() cartClick = new EventEmitter<void>();
cartCount = 0;
searchText = '';
login:any;
  constructor(private cartService:CartService, private bookSearchService: BookSeach, private  Router:Router, private Book:Book) {}

  ngOnInit(): void {
  this.cartService.cartCount$.subscribe(count => {
    console.log('Navbar cart count updated:', count);
    this.cartCount = count;
    this.Book.islogined.subscribe((x)=>{this.login=x;})
  });
}
 menuOpen = false;

 

   onSearchChange(): void {
    this.bookSearchService.setSearchTerm(this.searchText.trim());
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  cartClicked() {
    this.cartClick.emit();
  }
}
