import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
checkoutData = {
  name: '',
  email: '',
  address: '',
  payment: 'cash'
};

onSubmit() {
  console.log('Order Submitted:', this.checkoutData);

  localStorage.removeItem('cart');
  alert('Order confirmed! Thank you.');
}
}
