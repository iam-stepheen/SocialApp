import { Component, OnInit } from '@angular/core';
import { containsTree } from '@angular/router/src/url_tree';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-freind-requests',
  templateUrl: './freind-requests.component.html',
  styleUrls: ['./freind-requests.component.css']
})
export class FreindRequestsComponent implements OnInit {
userinfo:any=[]
pinfo:any=[]
  constructor(private Api:ApiService,private loader:NgxSpinnerService,private toast:ToastrService) { }

  ngOnInit() {
    this.getrequest()
  }
 getrequest(){
   const details = ({
     request:'get_request' ,
     reciever:localStorage.getItem('email'),
     status:0
   })
    this.loader.show()
    this.Api.freinds_functions(details).subscribe(data=>{
      if(data !== null){
        this.loader.hide()
        for(var i=0 ; i < data.result.length ; i++){
           
          const details = ({
            request:'find_freinds2',
            email:data.result[i].sender
          })
           this.Api.freinds_functions(details).subscribe(data=>{
             this.userinfo.push(data.found)
            
           })
          
        }
      }
    })
 }
 accept(sender){
  const details = ({
    request:'accept_request' ,
    sender:sender,
    reciever:localStorage.getItem('email')
  })
    this.loader.show
  this.Api.freinds_functions(details).subscribe(data=>{
    if(data !== null){
      this.loader.hide()
      this.toast.success(data.message, 'Successfull');
      
    }
    this.getrequest()
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
