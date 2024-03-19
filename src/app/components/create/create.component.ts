import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { Project } from '../../models/projects';
import { ProjectService } from '../../services/projects.service';
import { FormsModule } from '@angular/forms'; // We must declare the library to work with Angular forms
import { UploadService } from '../../services/upload.service'; // We load the service to use the function
import { Global } from '../../services/global'; // we import this for use the url
import { Router, ActivatedRoute, Params } from '@angular/router'; // We need it for acces to the id of the project


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    // We must declare the component to work with it
    RouterOutlet, // Important to import the router as well in order to work with it.
    RouterModule, // Important to import the routermodule as well in order to work with the directive routerLink
    FormsModule,
    CommonModule
  ], 
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [
    ProjectService,
    UploadService // Load the service
  ]
})
export class CreateComponent {

  public url: string;
  public title: string;
  public project: Project;
  public save_project: any;
  public status: string = "";
  public filesToUpload: Array<File> = [];


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.title= "Crear proyecto";
    this.project = new Project('', '', '', '', 2024, '','');
  }

  ngOnInit() {

  }

  /* Save the data */
  // This method is used to process the submission of a form.
  onSubmit(form:any){
    console.log(this.project);
    // We use the saveProject method that we have created in projectService, pass the project, and use the subscribe method to capture the response
    this._projectService.saveProject(this.project).subscribe( // Subscribe have 2 callback functions
      response => {
        // We capture the response.
        if(response.project){
          // If I receive the response

          /* Upload the image */
          this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image')
          .then((result:any) => {            
            this.save_project = result.project;

            this.status = "succes";
            form.reset(); // Method to clear the form
          });
        } else {
          // If I not receive
          this.status = "failed";
        }
      }, 
      error => {
        // We capture the error and show in the console
        console.log(error);
      } 
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }



}
