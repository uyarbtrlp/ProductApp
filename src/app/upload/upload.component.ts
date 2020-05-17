import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  readonly baseURI="http://localhost:51207/api/"
  public message:string;
  public progress:number;
  @Output() public onUploadFinished=new EventEmitter();
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  public uploadFile=(files)=>{
    if(files.length===0)
    return;
    let fileToUpload=<File>files[0];
    const formData=new FormData();
    formData.append('file',fileToUpload,fileToUpload.name)
    this.http.post(this.baseURI+"Upload",formData,{reportProgress:true,observe:"events"}).subscribe(event=>{
      if(event.type===HttpEventType.UploadProgress){
        this.progress=Math.round(100*event.loaded/event.total)
      }
      else if(event.type===HttpEventType.Response){
        this.message="Upload Success"
        this.onUploadFinished.emit(JSON.stringify(event.body))
      }

    })

  }

}
