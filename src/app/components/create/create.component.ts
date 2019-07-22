import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/models';
import {ProjectService} from '../../services/project.service';
import {UploadService} from '../../services/upload.service';
import {Global}   from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService,UploadService]
})
export class CreateComponent implements OnInit {
  
  public title:string;
  public project:Project;
  public status:string=null;
  public filesToUpload:Array<File>;
  public savedProject;
  constructor(
    private _projectService:ProjectService,
    private _uploadService:UploadService
  ) {
    this.title="Crear Proyecto";
    this.project=new Project('','','','',2019,'','');
   }
   

  ngOnInit() {
  }
  onSubmit(form){
    
    this._projectService.saveProject(this.project).subscribe(
      res=>{
            console.log(res.proyect);
            if(res.proyect){
              
              //subir imagen
              this._uploadService.makeFileRequest(Global.url+"uploadimg/"+res.proyect._id,[],this.filesToUpload,'image').then((result:any)=>{
                this.status='success';
                console.log(result)
                this.savedProject=result.proyect;
                form.reset();
                console.log(this.savedProject)
              });

              
            }else{
              this.status='failed';
            }
    },err=>{
            console.log(<any>err);
    });   
  }
  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;
  }

}
