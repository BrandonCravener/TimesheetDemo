import { Component } from '@angular/core';
import { flush } from '@angular/core/testing';
import { PrimeTabChange } from 'src/app/shared/models/PrimeTabChange';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {


  registerTabActive = false

  resetPassword() {
    console.log("reset")
  }

  tabChange(event: PrimeTabChange) {
    this.registerTabActive = event.index == 1
  }
}
