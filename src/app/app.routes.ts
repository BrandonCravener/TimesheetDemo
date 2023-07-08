import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { LoginComponent } from './core/pages/login/login.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { DialogService } from 'primeng/dynamicdialog';

const redirectLoggedInToHome = () => redirectLoggedInTo(['/punch/viewer'])
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])


export const ROUTES: Routes = [
    { path: '', component: HomeComponent, ...canActivate(redirectLoggedInToHome) },
    {
        providers: [DialogService],
        path: 'punch', loadChildren: () => import('./features/punch/routes'), ...canActivate(redirectUnauthorizedToLogin)
    },
    { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) },
    { path: '**', component: NotFoundComponent }
];