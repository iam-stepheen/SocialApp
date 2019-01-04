import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-freinds1',
  templateUrl: './freinds1.component.html',
  styleUrls: ['./freinds1.component.css']
})
export class Freinds1Component implements OnInit {
  status:Number
freinds:any=[]
pinfo :any=[]
  constructor(private Api:ApiService,private loader:NgxSpinnerService) { }

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
            
            for(var i = 0;i<data.found.freinds.length;i++){
                 // console.log(data.found.freinds[i].email)
                  const details = ({
                    request:'get_freinds',
                    email:data.found.freinds[i].email
                  })
               // this.loader.show()
                this.Api.freinds_functions(details).subscribe(data=>{
                 // console.log(data)
                  if(data!==null){
                   
                    console.log(data.found)
                   this.freinds.push(data.found)

                  }
                 
                })
            }
        }
      
      })
     
    }
    profile(email){
      const details = ({
        request:'get_freinds',
        email:email
      })
      this.Api.freinds_functions(details).subscribe(data=>{
        this.pinfo=[]
      this.pinfo.push(data.found)
      
      })
    }
}
