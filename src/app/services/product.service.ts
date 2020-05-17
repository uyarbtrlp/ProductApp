import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 readonly baseURI="http://localhost:51207/api/"
 private id:string;
  constructor(private fb:FormBuilder,private http:HttpClient) { 
    
  }
  
  formModel=this.fb.group({
    Name:['',[Validators.required]],
    Price:['',Validators.required],
    Description:[''],
    CategoryId:['']
 
   
    
    
  },{validator:this.emptyCheck})
  emptyCheck(fb:FormGroup){
    let name=fb.get('Name');
    let price=fb.get('Price');
    if(name.errors==null ||"empty" in name.errors){
      if(name.value.startsWith(" ")){
        name.setErrors({empty:true})

      }
      else{
        name.setErrors(null)
      }

    }
    
  }
  addProduct(){
    var body={
      Name:this.formModel.value.Name,
      Description:this.formModel.value.Description,
      Price:this.formModel.value.Price.toString(),
      CategoryId:this.formModel.value.CategoryId
    }
    return this.http.post(this.baseURI+"Product/addProduct",body)

  }
  getProducts(){
    return this.http.get(this.baseURI+"Product/getProducts")
  }
  getCategories(){
    return this.http.get(this.baseURI+"Product/getCategories")
  }
  initializeFormGroup(){
    this.formModel.setValue({
      
        
        Name:'',
        Description:'',
        Price:'',
        CategoryId:''
      })

    
  }

  populateForm(product){
    this.formModel.setValue({
      Name:product.name,
      Description:product.description,
      Price:product.price,
      CategoryId:product.categoryId
    })
    this.id=product.id
  }
  updateProduct(){
   
    var body={
      Name:this.formModel.value.Name,
      Description:this.formModel.value.Description,
      Price:this.formModel.value.Price.toString(),
      CategoryId:this.formModel.value.CategoryId,
      id:this.id
    }
    return this.http.post(this.baseURI+"Product/updateProduct",body)

  }
  deleteProduct(id){
    
    let httpParams = new HttpParams().set('id', id);
    let options = { params: httpParams };
      
  
    
    
    return this.http.delete(this.baseURI+"Product/deleteProduct/",options)
    
  }
  
}
