import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig,MatDialogRef} from '@angular/material/dialog'
import { AddProductComponent } from './add-product/add-product.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
products;
  constructor() { }

  ngOnInit(): void {
   
  }
  

}
