import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel={
    UserName:"",
    Password:""
  }
  showSpinner=false;

  constructor(private service:UserService,private router:Router,private toast:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl("/home/products")
    }
  }
  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any)=>{
        this.showSpinner=true;
        setTimeout(()=>{
          localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/home/products');
        this.showSpinner=false;

        },2000)
        

      },
      err=>{
        this.showSpinner=true
        setTimeout(()=>{
          if(err.status==400){
            this.toast.error(err.error.message,"Authentication failed.")
            this.showSpinner=false
  
          }
          else{
            this.toast.error(err.message,"Authentication failed.")
  
          }

        },2000)
       
        
          

        

      }
    );
    
  }

}
