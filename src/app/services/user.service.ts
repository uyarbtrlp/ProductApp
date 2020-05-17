import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
readonly baseURI="http://localhost:51207/api/"
image;
formData;
fileToUpload;
progress;
message;
response:any={dbPath:''};
defaultImage;
userDetails;
  constructor(private fb:FormBuilder,private http:HttpClient) { }
  formModel=this.fb.group({
    UserName:['',Validators.required],
    Name:['',Validators.required],
    Surname:['',Validators.required],
    Passwords:this.fb.group({
      ConfirmPassword:['',Validators.required],
      Password:['',Validators.required]
    },{validator: this.comparePasswords}),
    
    Email:['',[Validators.email,Validators.required]],
  })
  comparePasswords(fb:FormGroup){
    let confirmPasswordCtrl=fb.get("ConfirmPassword");
    if(confirmPasswordCtrl.errors==null || "passwordMismatch" in confirmPasswordCtrl.errors){
      if(fb.get("Password").value!=confirmPasswordCtrl.value){
        confirmPasswordCtrl.setErrors({passwordMismatch:true})

      }
      else{
        confirmPasswordCtrl.setErrors(null)

      }
    }
  }
  populateForm(user){
    this.formModel.patchValue({
      UserName:user.userName,
      Name:user.name,
      Surname:user.surname,
      Email:user.email
    })
    
  }
  updateUser(){
   
    var body={
      Name:this.formModel.value.Name,
      Surname:this.formModel.value.Surname,
      Username:this.formModel.value.UserName,
      Email:this.formModel.value.Email,
      Image:this.image
    }
    return this.http.post(this.baseURI+"AppUser/updateUser",body)
  }
   

  imageUpload(){
    this.formData=new FormData();
    if(this.fileToUpload!=null){
      this.formData.append('file',this.fileToUpload,this.fileToUpload.name)
    return this.http.post(this.baseURI+"Upload",this.formData)

    }
    else{
      this.formData.append('filex',this.fileToUpload)
      return this.http.post(this.baseURI+"Upload",this.formData)
    }
    
  }

  register(){
    
    var body={
      Username:this.formModel.value.UserName,
      Name:this.formModel.value.Name,
      Surname:this.formModel.value.Surname,
      Email:this.formModel.value.Email,
      Password:this.formModel.value.Passwords.Password,
      Image:this.image
    }
    return this.http.post(this.baseURI+"AppUser/Register",body)
  }
  login(formData){
    return this.http.post(this.baseURI+"AppUser/Login",formData)
  }
  getUserProfile(){
    return this.http.get(this.baseURI+"AppUser/GetUserProfile")
  }
  initializeFormGroup(){
    this.formModel.setValue({
      
        UserName:'',
        Name:'',
        Surname:'',
        Passwords:{
          ConfirmPassword:'',
          Password:''
        },
        
        Email:'',
        
      })
      this.image=null
      

    
  }
}
