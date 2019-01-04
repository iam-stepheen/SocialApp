import { Component, OnInit,EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
//import { EmailValidator } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
items :any
firstname:String
secondname:String
email:String
website:String
occupation:String
phone:String
x:Number
status:Number
options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  constructor(private loader:NgxSpinnerService , private Api:ApiService,private toast:ToastrService
    
    ) { 
      this.options = { concurrency: 1, maxUploads: 3 ,allowedContentTypes: ['image/jpeg', 'image/png']};
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    }

  ngOnInit() {
    this.getrequests()
    this.x=0
    this.status = 0
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
          this.items = data.found
      }
    
    })
   
  }
  updateprofile(){
    const details=({
      firstname:this.firstname,
      secondname:this.secondname,
      email:this.email,
      website:this.website,
      occupation:this.occupation,
      phone:this.phone
    })
    console.log(details)
  }
  onUploadOutput(output: UploadOutput): void {
    if(output.file.type !== 'image/jpeg'){
           this.toast.error("The Default Image Type is JPEG")
    }
    if(output.file.type == 'image/jpeg'){
      this.status=1;
      switch (output.type) {
       
        case 'allAddedToQueue':
        //console.log('DD')
            // uncomment this if you want to auto upload files when added
            // const event: UploadInput = {
            //   type: 'uploadAll',
            //   url: '/upload',
            //   method: 'POST',
            //   data: { foo: 'bar' }
            // };
            // this.uploadInput.emit(event);
            
          break;
        case 'addedToQueue':
          if (typeof output.file !== 'undefined') {
            this.files.push(output.file);
          }
          break;
          
        case 'uploading':
          if (typeof output.file !== 'undefined') {
            // update current data in files array for uploading file
            const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
          }
          break;
          
        case 'removed':
          // remove file from array when removed
          this.files = this.files.filter((file: UploadFile) => file !== output.file);
          break;
        case 'dragOver':
          this.dragOver = true;
          break;
        case 'dragOut':
        case 'drop':
          this.dragOver = false;
          break;
        case 'done':
          // The file is downloaded
          break;
      }
    }
    
  }
  //this.toast
  startUpload(): void {
    this.status=0
      this.loader.show()
      
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:8080/api/profileupload/:'+localStorage.getItem('email'),
      method: 'POST',
      data: { foo: 'bar' }
    };
 
    this.uploadInput.emit(event);
    this.loader.hide()
    this.toast.success('Profile Picture Successfully Uploaded')
   
   }
}
