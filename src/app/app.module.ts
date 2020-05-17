import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatOptionModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { ProductsComponent } from './home/products/products.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AddProductComponent } from './home/products/add-product/add-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ProductListComponent } from './home/products/product-list/product-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdateProductComponent } from './home/products/update-product/update-product.component';
import { ConfirmDialogComponent } from './home/products/confirm-dialog/confirm-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { UploadComponent } from './upload/upload.component';
import { AngularFileUploaderModule } from "angular-file-uploader";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    ProductsComponent,
    ProfileComponent,
    AddProductComponent,
    ProductListComponent,
    UpdateProductComponent,
    ConfirmDialogComponent,
    UploadComponent,
    

      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatOptionModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
    ShowHidePasswordModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSelectModule,
    AngularFileUploaderModule
    

    
    
    ],
  providers: [UserService,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  entryComponents:[AddProductComponent]
})
export class AppModule { }
