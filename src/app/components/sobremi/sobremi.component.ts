import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css']
})
export class SobremiComponent implements OnInit {
  public title:string;
  public subtitle:string;
  public email:string;
  constructor() {
    this.title="César Alberto";
    this.subtitle="Pasante de ingenieria en informatica";
    this.email="src_graff@hotmail.com";

   }

  ngOnInit() {
  }

}
