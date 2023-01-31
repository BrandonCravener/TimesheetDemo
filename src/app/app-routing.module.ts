import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { HomeComponent } from './features/landing/pages/home/home.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { NotFoundComponent } from './core/pages/not-found/not-found.component';


const redirectLoggedInToHome = () => redirectLoggedInTo([''])
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'punch', loadChildren: () => import('./features/punch/punch.module').then(m => m.PunchModule), ...canActivate(redirectUnauthorizedToLogin)
  },
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
