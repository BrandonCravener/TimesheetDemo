import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  show: boolean = true;

  refresh() {
    this.show = false;
    setTimeout(() => this.show = true, 0)
  }

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.menuItems[1]['visible'] = true;
        this.menuItems[2]['visible'] = false;
        this.menuItems[3]['visible'] = true;
      } else {
        this.menuItems[1]['visible'] = false;
        this.menuItems[2]['visible'] = true;
        this.menuItems[3]['visible'] = false;
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
    },
    {
      label: 'Login',
      routerLink: '/login',
      visible: !this.authService.currentlyAuthenticated
    },
    {
      label: 'Sign-out',
      command: () => {
        this.authService.logout()
      },
      visible: this.authService.currentlyAuthenticated
    }
  ]

}
