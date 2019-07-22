import { Component, OnInit } from '@angular/core';
import {Global} from '../../services/global';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../models/models';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProjectService]
})
export class DetailComponent implements OnInit {
  public url:string;
  public project:Project;
  constructor(
    private _projectService:ProjectService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
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
  deleteProyect(id){
    this,this._projectService.deleteProjects(id).subscribe(res=>{
          console.log(res.proyect);
          if(res.proyect){
              this._router.navigate(['/proyectos']);
          }
    },err=>{
          console.log(<any>err);
    });
  }

}
