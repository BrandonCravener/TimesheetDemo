import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

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



  ngOnInit(): void {

  }

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
          label: 'Viewer',
          routerLink: '/punch/viewer'
        },
        {
          label: "Add Punch",
          icon: 'pi pi-plus',
          routerLink: '/punch/add'
        }
      ],
      visible: this.authService.currentlyAuthenticated
    }
  ]

  signIn() {
    this.router.navigateByUrl('/login')
  }

  signOut() {
    this.authService.logout()
  }

}
