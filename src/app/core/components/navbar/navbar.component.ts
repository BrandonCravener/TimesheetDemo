import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SharedModule } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  standalone: true,
  imports: [NgIf, MenubarModule, SharedModule, ButtonModule]
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
      ],
      visible: this.authService.currentlyAuthenticated
    }
  ]

  show: boolean = true;
  authenticated: boolean = false;

  refresh() {
    this.show = false;
    setTimeout(() => this.show = true, 0)
  }

  constructor(private authService: AuthService, private router: Router) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.menuItems[1]['visible'] = true;
        this.authenticated = true;
      } else {
        this.menuItems[1]['visible'] = false;
        this.authenticated = false;

        this.router.navigateByUrl('/')
      }
      this.refresh()
    })
  }

  signIn() {
    this.router.navigateByUrl('/login')
  }

  signOut() {
    this.authService.logout()
  }

}
