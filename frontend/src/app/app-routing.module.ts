import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewsfeedComponent } from './social/newsfeed/newsfeed.component';
import { FreindsComponent } from './social/freinds/freinds.component';
import { MessagesComponent } from './social/messages/messages.component';
const routes: Routes = [

  {path:'',pathMatch:'full',redirectTo:'/login'},
  {path:'messages',component:MessagesComponent},
  {path:'login',component:LoginComponent},
  {path:'sidebar',component:SidebarComponent,
    children:[
      {path:'',pathMatch:'full',redirectTo:'newsfeed'},
      
      {path:'newsfeed',component:NewsfeedComponent},
      {path:'freinds',component:FreindsComponent},
      {path:'messages',component:MessagesComponent},
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
