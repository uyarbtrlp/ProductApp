import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductsComponent } from './home/products/products.component';
import { ProfileComponent } from './home/profile/profile.component';


const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
{
  path:'user',component:UserComponent,children:[
    {path:'register',component:RegisterComponent}
    ,{path:'login',component:LoginComponent}
  ]
},
{
  path:'home',component:HomeComponent,canActivate:[AuthGuard],children:[
    {path:'profile',component:ProfileComponent}
    ,{path:'products',component:ProductsComponent}
  ]
},
{path:"home",redirectTo:"/home/products",pathMatch:"full"}]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
