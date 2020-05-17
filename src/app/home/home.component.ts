import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,public service:UserService) { }
  navbarOpen = false;
  showFiller = false;
  @Input() name;
  ngOnInit(): void {
    this.service.getUserProfile().subscribe(res=>{
      this.service.userDetails=res;
      
      
    },
    err=>{
      console.log(err)

    })
    

  }
  public createImagePath(serverPath){
    if(serverPath!=null){
      return 'http://localhost:51207/'+serverPath

    }
    
  }
  
  
  onLogout(){
    localStorage.removeItem('token')
    this.router.navigate(["/user/login"])
    this.service.formModel.reset();
    this.service.initializeFormGroup();
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
