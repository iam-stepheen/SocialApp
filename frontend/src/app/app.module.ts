import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
//import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewsfeedComponent } from './social/newsfeed/newsfeed.component';
import { FreindsComponent } from './social/freinds/freinds.component';
import { MessagesComponent } from './social/messages/messages.component';
//import { SocialModule } from './social/social.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    NewsfeedComponent,
    FreindsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    // SocialModule,
    AppRoutingModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
