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
import { FormsModule } from '@angular/forms';
//import { SocialModule } from './social/social.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HttpModule } from '@angular/http';
//import { TimelineComponent } from './social/timeline/timeline.component';
import { AboutComponent } from './social/about/about.component';
import { Freinds1Component } from './social/freinds1/freinds1.component';
import { FindFreindsComponent } from './social/find-freinds/find-freinds.component';
import { FreindRequestsComponent } from './social/freind-requests/freind-requests.component';
import { ProfileComponent } from './social/profile/profile.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    NewsfeedComponent,
    FreindsComponent,
    MessagesComponent,
    //TimelineComponent,
    AboutComponent,
    Freinds1Component,
    FindFreindsComponent,
    FreindRequestsComponent,
    ProfileComponent,
   
  ],
  imports: [
    BrowserModule,
    NgxUploaderModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
  
    NgxSpinnerModule, // required animations module
    ToastrModule.forRoot(),
    AppRoutingModule
    
   
  ],
  
  providers: [
    AuthGuard
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
