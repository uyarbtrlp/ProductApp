import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  constructor(public service:ProductService,public toast:ToastrService,public dailogRef:MatDialogRef<UpdateProductComponent>) { }

  ngOnInit(): void {
    this.service.getCategories().subscribe(res=>{
      this.categories=res

    },
    err=>{
      console.log(err)
    })
  }
  categories;
  onSubmit(){
    this.service.updateProduct().subscribe(
      res=>{
        this.toast.info("Product is updated successfully.","Product Updated")
        this.service.formModel.reset();
        this.service.initializeFormGroup();
        this.dailogRef.close();

      },
      err=>{
        this.toast.error(err.message,"Failed.")
        console.log(err)

      }
    )
  }
  onClear(){
    this.service.formModel.reset();
    this.service.initializeFormGroup();
  }
  onClose(){
    this.service.formModel.reset();
    this.service.initializeFormGroup();
    this.dailogRef.close()

  }

}
