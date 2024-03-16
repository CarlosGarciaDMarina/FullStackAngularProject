import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/projects';
import { ProjectService } from '../../services/projects.service';
import { FormsModule } from '@angular/forms'; // We must declare the library to work with Angular forms
import { UploadService } from '../../services/upload.service'; // We load the service to use the function
import { Global } from '../../services/global'; // we import this for use the url

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ], // We must declare the component to work with it
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [
    ProjectService,
    UploadService // Load the service
  ]
})
export class CreateComponent {

  public title: string;
  public project: Project;
  public status: string = "";
  public filesToUpload: Array<File> = [];


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
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
            this.status = "succes";
            console.log(result);
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
