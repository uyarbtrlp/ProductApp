import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
userDetails;
updateMode=false;
photo:string;
fileName;
errorMessage;
imageUrl
@ViewChild('imagebox') div:ElementRef
@ViewChild(HomeComponent,{static:true}) home:HomeComponent
  constructor(public service:UserService,public toast:ToastrService,public router:Router) { }

  ngOnInit(): void {
    
    this.service.getUserProfile().subscribe(res=>{
      this.service.userDetails=res;
      this.onEdit(this.service.userDetails)
      
    },
    err=>{
      console.log(err)

    })

  }
  onEdit(user){
    this.service.populateForm(user)
    
  }
  public uploadFile=(files)=>{
    if(files.length===0)
    return;
    else{
      this.service.fileToUpload=<File>files[0];
      
    
      if(files[0].type=='image/png'){
       this.fileName=files[0].name
       var reader=new FileReader()
       reader.onload=(event:any)=>{
         this.div.nativeElement.style.backgroundImage="url("+event.target.result+")"
         
       }
       reader.readAsDataURL(this.service.fileToUpload);
 
      }
      else if(files[0].type=='image/jpeg'){
       this.fileName=files[0].name
       var reader=new FileReader()
       reader.onload=(event:any)=>{
         this.div.nativeElement.style.backgroundImage="url("+event.target.result+")"
         
       }
       reader.readAsDataURL(this.service.fileToUpload);
 
     }
     else if(files[0].type=='image/jpg'){
       this.fileName=files[0].name
       var reader=new FileReader()
       reader.onload=(event:any)=>{
         this.div.nativeElement.style.backgroundImage="url("+event.target.result+")"
         
       }
       reader.readAsDataURL(this.service.fileToUpload);
 
     }
     else{
       this.errorMessage=".jpg/.png/jpeg extensions are allowed."
 
     }
    }
    
     
    
   
  }
  onSubmit(){    
   
    this.service.imageUpload().subscribe(
      (event:any)=>{
        
        this.service.image=event.dbPath
        this.service.updateUser().subscribe(
          (res:any)=>{
            if(res!=null){
              
              this.service.getUserProfile().subscribe(res=>{
                this.service.userDetails=res;
                
                this.updateMode=false
                
                this.service.fileToUpload=null;
                this.fileName=''
                
                this.toast.info("User is updated.","Update Successful")
                
                
                
                
                
                
              },
              err=>{
                console.log(err)
          
              })
              
                
                
      
                
                
                
    
              
              
              
              
            }
            else{
              
              
                res.errors?.forEach(element => {
                  this.toast.error(element.description)
                });
    
              
              
              
            }
    
          },
          err=>{
            console.log(err)
          }
        )
       

      })
      
      
      
  
     
    
   

   
    
  }
  updateModOn(){
    this.updateMode=true
    console.log(this.updateMode)
  }
  onSave(){
    this.updateMode=false
    
  }
  public getUserDetails(){
    
    this.service.getUserProfile().subscribe(res=>{
      this.service.userDetails=res;
      
      
    },
    err=>{
      console.log(err)

    })
    return this.service.userDetails
  }
  public createImagePath(serverPath){
    this.photo=serverPath;
     this.photo=this.photo.replace('\\','/')
     this.photo=this.photo.replace('\\','/')
     this.photo='http://localhost:51207/'+this.photo
    return 'http://localhost:51207/'+serverPath
  }

}
