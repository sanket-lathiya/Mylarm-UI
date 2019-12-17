import { SignUpComponent } from 'src/components/sign-up/sign-up.component';
import { LoginComponent } from 'src/components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../modules/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { MdbMaterialModule } from 'src/modules/mdb-material.module';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'src/modules/angular-material.module';
import { AuthGuard } from 'src/auth-guards/auth.guard';
import { AuthService } from 'src/services/auth.service';
import { MylarmComponent } from '../components/mylarm/mylarm.component';
import { GroupsComponent } from '../components/groups/groups.component';
import { GroupService } from 'src/services/group.service';
import { MyAlertsComponent } from '../components/my-alerts/my-alerts.component';
import { AlertsForYouComponent } from '../components/alerts-for-you/alerts-for-you.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    MylarmComponent,
    GroupsComponent,
    MyAlertsComponent,
    AlertsForYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbMaterialModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
