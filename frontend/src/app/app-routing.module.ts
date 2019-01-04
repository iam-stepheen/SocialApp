import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewsfeedComponent } from './social/newsfeed/newsfeed.component';
import { FreindsComponent } from './social/freinds/freinds.component';
import { MessagesComponent } from './social/messages/messages.component';
import { AboutComponent } from './social/about/about.component';
//import { TimelineComponent } from './social/timeline/timeline.component';
import { Freinds1Component } from './social/freinds1/freinds1.component';
import { FindFreindsComponent } from './social/find-freinds/find-freinds.component';
import { FreindRequestsComponent } from './social/freind-requests/freind-requests.component';
import {ProfileComponent} from './social/profile/profile.component';
import { AuthGuard } from './services/auth-guard.service';
const routes: Routes = [

  {path:'',pathMatch:'full',redirectTo:'/login'},
  //{path:'messages',component:MessagesComponent,canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent},
  //{path:'profile',component:ProfileComponent},
  {path:'sidebar',component:SidebarComponent,
    children:[
      {path:'',pathMatch:'full',redirectTo:'newsfeed'},
      
      {path:'newsfeed',component:NewsfeedComponent,canActivate: [AuthGuard]},
     // {path:'profile',component:ProfileComponent},
      {path:'freinds',component:FreindsComponent,
          children:[
            {path:'',pathMatch:'full',redirectTo:'about'},
            {path:'about',component:AboutComponent,canActivate: [AuthGuard]},
            {path:'find-freinds',component:FindFreindsComponent,canActivate: [AuthGuard]},
            {path:'freind-p',component:Freinds1Component,canActivate: [AuthGuard]},
            {path:'freind-request',component:FreindRequestsComponent,canActivate: [AuthGuard]},
            {path:'profile',component:ProfileComponent,canActivate: [AuthGuard]},
          ]},
      {path:'messages',component:MessagesComponent,canActivate: [AuthGuard]},
      {path:'**',pathMatch:'full',redirectTo:'newsfeed'}
    ]}
];

@NgModule({
  declarations:[
  
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
