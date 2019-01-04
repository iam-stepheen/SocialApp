import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
 
import {ApiService} from '../../services/api.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   
})
export class LoginComponent implements OnInit {
   firstname:string
   secondname:string
   email:string
   password:string
   cpassword:string
   gender:string
  constructor(private toastr: ToastrService, private Api:ApiService,private router:Router,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
  }
   register(){

    
       const details = ({
         request : "register",
         firstname:this.firstname,
         secondname:this.secondname,
         email:this.email,
         password:this.password,
         cpassword:this.cpassword,
         activated:0,  
         freinds:[],
        profilepicture:"null",
        coverpicture:"null",
        gender:this.gender,
        occupation:'null',
        website:'null',
        phone:'null',
        education:[],
        social:[]
        
       })
       console.log(details)
      if(details.firstname == null ||details.secondname ==null||details.email==null||details.password==null||details.cpassword==null){
        this.toastr.error('All Fields Are Required!', 'Validation Error');
      }
      if(details.password !== details.cpassword){
        this.toastr.error('Password Doesnt Match', 'Validation Error');
      }

      if(details.password == details.cpassword){
            if(details.password==null||details.cpassword==null){
              
            }
           else{
            this.spinnerService.show();
            this.Api.auth(details).subscribe(data=>{
             if(data!==null){
              this.spinnerService.hide();
             }
              if(data.success == true){
                this.toastr.success(data.message,'Registration Successfull');
                localStorage.setItem('email',this.email)
                this.router.navigate(['/sidebar'])
              }
              if(data.success == false){
                this.toastr.error(data.message,'Registration Error!');
              }
             })
           }
       
      }
   } 

   login(){
     const details=({
       request:'login',
        email:this.email,
        password:this.password
     })
     if(details.email == null||details.password == null){
      this.toastr.error('All Fields Are Required!', 'Validation Error');
     }
     else{
      this.spinnerService.show();
       this.Api.auth(details).subscribe(data=>{
         if(data !==null){
           this.spinnerService.hide()
           if(data.success == false){
            this.toastr.error(data.message, 'Login Error');
           }
           if(data.success == true){
            localStorage.setItem('email',this.email)
            localStorage.setItem('token',data.token)
            this.toastr.success(data.message, 'Login Success');
            this.router.navigate(['/sidebar'])
           }
             
         }
       })
     }
   }
}

