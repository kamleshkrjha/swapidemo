import { PlanetsComponent } from './planets/planets.component';
import { LoginComponent } from './login/login.component';
import { Router, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'planets', component: PlanetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
