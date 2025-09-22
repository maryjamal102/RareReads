import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Book {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) {}

  getBooks(query: string = 'romance'): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}${query}`);
}

getBooksByCategory(category: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}${category}`);
}


getBookById(id: string): Observable<any> {
  return this.http.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
}

getBooksByTitle(title: string): Observable<any> {
  return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`);
}

login(data:any):Observable<any>{
  let res=this.http.post('https://dummyjson.com/user/login',data);
  return res;
}
islogined=new BehaviorSubject(false);

logout() {
  this.islogined.next(false);
  localStorage.removeItem('token'); 
}
}
