import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  standalone: true,
  imports: [ButtonModule]
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigate(url: string) {
    this.router.navigateByUrl(url)
  }
}
