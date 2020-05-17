import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig,MatDialogRef} from '@angular/material/dialog'
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(public dailogRef:MatDialogRef<AddProductComponent>,public service:ProductService,private toast:ToastrService) { 
    
  }
  selectedCategory

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
    this.service.addProduct().subscribe(
      res=>{
        this.toast.success("Product is created successfully.","Product Created")
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
