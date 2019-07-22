import { Component, OnInit } from '@angular/core';
import {Global} from '../../services/global';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../models/models';
import { UploadService } from '../../services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers:[ProjectService,UploadService]
})
export class EditComponent implements OnInit {

  public title:string;
  public project:Project;
  public status:string=null;
  public filesToUpload:Array<File>;
  public savedProject;
  public url:string;
  constructor(
    private _projectService:ProjectService,
    private _uploadService:UploadService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.title="Editar Proyecto";
    this.url=Global.url;
   }
   

   ngOnInit() {
    this._route.params.subscribe(params=>{
        let id = params.id;

        this.getProyect(id);
    });
  }

  getProyect(id){
    this._projectService.getProyect(id).subscribe(
      res=>{ 
        console.log(res);
          this.project=res.response;
      },
      err=>{
          console.log(<any>err);
      });
  }
  onSubmit(){
    this._projectService.updateProject(this.project).subscribe(
      res=>{
        console.log(res.proyect);
        if(res.proyect){

          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"uploadimg/"+res.proyect._id,[],this.filesToUpload,'image').then((result:any)=>{
              
              console.log(result.proyect)
              this.savedProject=res.proyect;
              this.status='success';

            });
          }
           else{
            
            this.savedProject=res.proyect;
            this.status='success';
          } 
                    
        }else{
          this.status='failed';
        }
      },
      err=>{
        console.log(<any>err);
      });
  }
  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;
  }

}
