import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Punches',
      items: [
        {
          label: "Add Punch",
          icon: 'pi pi-plus',
          routerLink: '/punch/add'
        }
      ]
    },
    {
      label: 'Login',
      routerLink: '/login'
    }
  ]

}
