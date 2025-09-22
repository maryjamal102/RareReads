import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookSeach {
    private searchTerm = new BehaviorSubject<string>(''); 
  searchTerm$ = this.searchTerm.asObservable();

  setSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
}
