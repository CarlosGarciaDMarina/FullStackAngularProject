import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';import { Project } from '../../models/projects';
import { ProjectService } from '../../services/projects.service';
import { FormsModule } from '@angular/forms'; // We must declare the library to work with Angular forms
import { UploadService } from '../../services/upload.service'; // We load the service to use the function
import { Global } from '../../services/global'; // we import this for use the url
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    // We must declare the component to work with it
    RouterOutlet, // Important to import the router as well in order to work with it.
    RouterModule, // Important to import the routermodule as well in order to work with the directive routerLink
    FormsModule,
    CommonModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  providers: [
    ProjectService
  ]
})
export class DetailComponent implements OnInit{

  public url: string;
  public project: Project; // we define the object
  public confirm: boolean;

  constructor(
    // Declare dependencies for the project service (_projectService), router (_router), and activated route (_route).
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.url = Global.url;
    this.project = new Project("","","","",0,"",""); // we initialize the object
    this.confirm = false;
  }

  ngOnInit() {
    // Subscribe to route parameters to get the 'id' parameter
    this._route.params.subscribe(params => {
        let id = params['id'];

        // Call the getProject method with the id
        this.getProject(id);
    });
  }

  // Method to fetch project details using the provided id
  getProject(id: any){
    // Call the gretProject method from the project service
    this._projectService.getProject(id).subscribe(
      response => {
        // Assign the project received from the response to the local project variable
        this.project= response.project;
      }, error => {
        // Log any errors encountered durin the HTTP request
        console.log(<any>error);
      }
    );
  }

  setConfirm(confirm: boolean){
    this.confirm = confirm;
  }

  // Method to delete a project
  deleteProject(id:any){
    // Call the deleteProject method from the response to the local project variable
    this._projectService.deleteProject(id).subscribe(
      response => {
        // if we receive a response, redirect the user to the projects page
        if(response){
          this._router.navigateByUrl('proyectos');
        }
      }, 
      // If we do not receive a response, show a console message with the error
      error => {
        console.log(<any>error);
      }
    );
  }

}
