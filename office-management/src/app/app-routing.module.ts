import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth-guard/guard/auth.guard';


// routing 
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/views-routing.module').then(mod => mod.ViewsRoutingModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.component').then(mod => mod.LoginComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./errors/errors.component').then(mod => mod.ErrorsComponent)
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
