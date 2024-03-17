import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import for use directives on html components
import { RouterOutlet } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { Project } from '../../models/projects'; // Import the project
import { ProjectService } from '../../services/projects.service'; // Import the services
import { Global } from '../../services/global'; // Import Global for the URL
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    // We must declare the component to work with it
    RouterOutlet, // Important to import the router as well in order to work with it.
    RouterModule, // Important to import the routermodule as well in order to work with the directive routerLink
    CommonModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers:[
    ProjectService // Load the service
  ]
})
export class ProjectsComponent {

  public projects: Project[] = [];
  public url: string;

  constructor(
    private _projectServices: ProjectService // We load the service in the constructor to inject the object
  ){
    this.url = Global.url;
  }

  // This method runs as soon as the project loads
  ngOnInit(){
    this.getProjects();
  }

  // Method to obtain projects from the database
  getProjects(){
    this._projectServices.getProjects().subscribe(
      response => {
        if (response.projects) {
          this.projects = response.projects;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
