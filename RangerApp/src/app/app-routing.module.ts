import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContainerComponent } from './components/Container/Container.component';
import { FreightForwarderComponent } from './components/FreightForwarder/FreightForwarder.component';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login';
//const routes: Routes = [];
//const routes: Routes = [
//  //{
//  //  path: '', pathMatch: 'full', redirectTo: '/RangerApp/index.html'
//  //}, 
//  {
//    path: '', component: DashboardComponent
//  },
  
//  {
//    path: 'RangerApp', component: DashboardComponent
//  },
//  {
//    path: 'dashboard', component: DashboardComponent,
//  },
//  {
//    path: 'dashboard/:id', component: DashboardComponent,
//  },
//  {
//    path: 'Container/:id', component: ContainerComponent,
//  },
//  {
//    path: 'FreightForwarder', component: FreightForwarderComponent,
//  }
//  //{
//  //  path: 'home', component: HomeComponent
//  //}
//];

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'RangerApp', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'Container/:id', component: ContainerComponent, canActivate: [AuthGuard]
  },
  {
    path: 'FreightForwarder', component: FreightForwarderComponent, canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }


];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
