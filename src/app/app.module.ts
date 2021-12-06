import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoinService } from './services/coin.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AddWatch } from './addWatch/addWatch.component';
import { AddCoin } from './addCoin/addCoin.component';
import { AddStamp } from './addStamp/addStamp.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    ProfileComponent,
    AddWatch,
    AddCoin,
    AddStamp
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [authInterceptorProviders], 
  bootstrap: [AppComponent]
})
export class AppModule { }
