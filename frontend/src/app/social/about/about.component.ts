import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
userinfo:any
  constructor(private loader:NgxSpinnerService,private Api:ApiService) { }

  ngOnInit() {
    this.getrequests()
  }
  getrequests(){
    const details = ({
      request:'get_freinds',
      email:localStorage.getItem('email')
    })
    this.loader.show()
    this.Api.freinds_functions(details).subscribe(data=>{
      if(data !== null){
          this.loader.hide()
          this.userinfo = data.found
      }
    
    })
   
  }
}
