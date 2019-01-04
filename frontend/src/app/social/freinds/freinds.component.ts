import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-freinds',
  templateUrl: './freinds.component.html',
  styleUrls: ['./freinds.component.css']
})
export class FreindsComponent implements OnInit {
picture:any
details:any
freinds:any
  constructor(private Api:ApiService) { }

  ngOnInit() {
    this.getuser()
  }
  getuser(){
    this.Api.getuser().subscribe(data=>{

      this.picture ='http://localhost:8080/api/image/'+data.user.profilepicture
     this.details = data.user
   this.freinds = data.user.freinds.length
    })
   }
}

