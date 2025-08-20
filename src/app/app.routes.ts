import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CartPage } from './cart-page/cart-page';
import { Category } from './category/category';
import { BookDetailComponent } from './book-detail/book-detail';
import { Portfolio } from './portfolio/portfolio';
import { Checkout } from './checkout/checkout';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
    { path:'',redirectTo:'login', pathMatch:'full'},
    { path: 'home', component:HomeComponent},
    { path: 'portfolio', component:Portfolio},
    { path: 'cart', component:CartPage },
    { path: 'category', component:Category},
    { path: 'book/:id', component:BookDetailComponent },
    { path: 'checkout', component:Checkout },
    {path: 'login', component:Login},
    { path: 'signup', component:Signup },
];


