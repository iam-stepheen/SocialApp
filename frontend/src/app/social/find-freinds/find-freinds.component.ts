import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-find-freinds',
  templateUrl: './find-freinds.component.html',
  styleUrls: ['./find-freinds.component.css']
})
export class FindFreindsComponent implements OnInit {
    fullname:string
    found_users:any
    pinfo:any=[]
    
  constructor(private Api:ApiService,private spinnerService:NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit() {
  }
//function to find freinds 
find(){
  const details = ({
    request:"find_freinds",
    fullname:this.fullname.toLowerCase()
  })
  if(details.fullname == null){
    this.toastr.error('Search Field Is Required!', 'Validation Error');
  }
  else{
    this.spinnerService.show();
    this.Api.freinds_functions(details).subscribe(data=>{
      if(data !== null){
        this.spinnerService.hide();
        if(data.found.length == 0){
          this.toastr.error('', 'No User Found');
        }
        if(data.found.length !== 0){
          this.found_users = data.found
        }
      }
    })
  }
}
addfriend(email){
  const details = ({
    request : 'send_request',
    sender:localStorage.getItem('email'),
    reciever:email
  })
    this.spinnerService.show()
   this.Api.freinds_functions(details).subscribe(data=>{
     if(data !== null){
       this.spinnerService.hide()
       this.toastr.success(data.message, 'Success');
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
