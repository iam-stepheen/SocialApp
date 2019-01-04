import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
picture:any
  constructor(private Api:ApiService,private router:Router) { }

  ngOnInit() {
    this.getuser()
  }
  getuser(){
   this.Api.getuser().subscribe(data=>{
     this.picture ='http://localhost:8080/api/image/'+data.user.profilepicture
     console.log(this.picture)
   })
  }
  logout(){
    localStorage.clear()
    this.router.navigate[('/login')]
  }
}
