import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showSpinner=false;
  readonly baseURI="http://localhost:51207/api/"
  public message:string;
  public progress:number;
  response:any={dbPath:''};
  formData;
  fileName="";
  errorMessage;

  constructor(public service:UserService,private toast:ToastrService,public http:HttpClient) { }

  ngOnInit(): void {
  }
 
  public uploadFile=(files)=>{
    if(files.length===0)
    return;
     this.service.fileToUpload=<File>files[0];
    
     if(files[0].type=='image/png'){
      this.fileName=files[0].name

     }
     else if(files[0].type=='image/jpeg'){
      this.fileName=files[0].name

    }
    else if(files[0].type=='image/jpg'){
      this.fileName=files[0].name

    }
    else{
      this.errorMessage=".jpg/.png/jpeg extensions are allowed."

    }
     
    
   
  }
  resetUpload(){
    this.fileName=''
    this.service.fileToUpload=null
  }
 
 
  onSubmit(){    
    this.service.imageUpload().subscribe((event:any)=>{
      
      this.service.image=event.dbPath
      this.service.register().subscribe(
        (res:any)=>{
          if(res.succeeded){
            this.showSpinner=true;
            setTimeout(()=>{
              this.showSpinner=false;
              this.service.formModel.reset();
              this.service.fileToUpload=null;
              this.fileName=''
              
              this.toast.success("New user created.","Registration Successful")
              this.service.initializeFormGroup();
              
  
            },2000)
            
            
            
          }
          else{
            this.showSpinner=true;
            setTimeout(()=>{
              this.showSpinner=false;
              res.errors.forEach(element => {
                this.toast.error(element.description)
              });
  
            },2000)
            
            
          }
  
        },
        err=>{
          console.log(err)
        }
      )
     
    })
   

   
    
  }
 

}
