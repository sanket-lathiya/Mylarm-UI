import { AlertsForYouComponent } from './../components/alerts-for-you/alerts-for-you.component';
import { MyAlertsComponent } from './../components/my-alerts/my-alerts.component';
import { GroupsComponent } from './../components/groups/groups.component';
import { MylarmComponent } from '../components/mylarm/mylarm.component';
import { SignUpComponent } from 'src/components/sign-up/sign-up.component';
import { LoginComponent } from 'src/components/login/login.component';
import { HomeComponent } from 'src/components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/auth-guards/auth.guard';

const routes: Routes = [
  { path: '', component: MylarmComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'my-alerts', component: MyAlertsComponent, canActivate: [AuthGuard] },
  { path: 'alerts-for-you', component: AlertsForYouComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
