import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/home/products/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
products;
listData:MatTableDataSource<any>
displayedColumns:string[]=['name','description','price','categoryId','actions']
searchKey:string
isTableHasData:boolean=true;
categories;
selectedValue
filteredList:MatTableDataSource<any>
@ViewChild(MatSort,{static:true}) sort:MatSort
@ViewChild(MatTable,{static:true}) table:MatTable<any>

  constructor(private dialog:MatDialog,private service:ProductService,private taost:ToastrService) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(
      (res:any)=>{
        setTimeout(()=>{
        this.products=res;
        this.listData=new MatTableDataSource(this.products)
        this.listData.sort=this.sort;
        
        
        

        },2000)
        
        
      },err=>{
        console.log(err)
      }
    );
    this.service.getCategories().subscribe(res=>{
      this.categories=res

    },
    err=>{
      console.log(err)
    })
    
  }
  onClear(){
    this.searchKey=""
    this.onFilter();
  }
  onFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase()
    if(this.listData.filteredData.length > 0){
      this.isTableHasData = true;
    } else {
      this.isTableHasData = false;
    }
  }
  onProductCreate(){
    const config=new MatDialogConfig();
    config.disableClose=false;
    config.autoFocus=false;
    config.width="30%"
    config.hasBackdrop=true
    this.dialog.open(AddProductComponent,config).afterClosed().subscribe(result => {
      this.refresh();
    });
  
    

  }
  refresh() {
    this.service.getProducts().subscribe((res:Object[]) => {
      this.listData.data = res;
    })
    

}
onEdit(row){
  this.service.populateForm(row)
  const config=new MatDialogConfig();
  config.disableClose=false;
  config.autoFocus=true;
  config.width="30%"
  config.hasBackdrop=true
  this.dialog.open(UpdateProductComponent,config).afterClosed().subscribe(result => {
    this.refresh();
  });
}
onDelete(id){
 
  const config=new MatDialogConfig();
  config.disableClose=false;
  config.autoFocus=true;
  config.width="30%"
  config.hasBackdrop=true
  this.dialog.open(ConfirmDialogComponent,config).afterClosed().subscribe(res=>{
    if(res){
      this.service.deleteProduct(id).subscribe(res=>{
           this.taost.error("Product is deleted.","Product Deleted")
            this.refresh();
          }
           );

    }


  })
  
}
onSelectChange(){
  const array=[];
  
  this.listData.data.filter((element)=>{
    if(element.categoryId==this.selectedValue?.id){
      array.push(element);
    }
    
    this.filteredList=new MatTableDataSource(array)
  this.table.dataSource=this.filteredList
    
  })
  
  if(this.selectedValue=="all"){
    this.table.dataSource=this.listData
  }
  


}
}
