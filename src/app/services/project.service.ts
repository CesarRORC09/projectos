import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Project} from '../models/models';
import {Global} from '../services/global';

@Injectable()
export class ProjectService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    testService(){
        return 'Probando el sevicio de angular'
    }
    saveProject(project:Project): Observable<any>{
        let params=JSON.stringify(project);
        let headers=new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'save-proyect',params,{headers:headers});
    }
    getProjects(): Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','aplication/json');

        return this._http.get(this.url+'proyects',{headers:headers});
    }
    getProyect(id): Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','aplication/json');

        return this._http.get(this.url+'proyect/'+id,{headers:headers});
    }
    deleteProjects(id): Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','aplication/json');

        return this._http.delete(this.url+'proyect/'+id,{headers:headers});
    }
    updateProject(project):Observable<any>{
        let params=JSON.stringify(project);
        let headers=new HttpHeaders().set('Content-Type','aplication/json');

        return this._http.put(this.url+'proyect/'+project._id,params,{headers:headers});
    }

}
