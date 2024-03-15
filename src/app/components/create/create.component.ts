import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/projects';
import { ProjectService } from '../../services/projects.service';
import { FormsModule } from '@angular/forms'; // We must declare the library to work with Angular forms

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ], // We must declare the component to work with it
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService]
})
export class CreateComponent {

  public title: string;
  public project: Project;
  public status: string = "";


  constructor(
    private _projectService: ProjectService
  ) {
    this.title= "Crear proyecto";
    this.project = new Project('', '', '', '', 2024, '','');
  }

  ngOnInit() {

  }

  // This method is used to process the submission of a form.
  onSubmit(form:any){
    console.log(this.project);
    // We use the saveProject method that we have created in projectService, pass the project, and use the subscribe method to capture the response
    this._projectService.saveProject(this.project).subscribe( // Subscribe have 2 callback functions
      response => {
        // We capture the response.
        if(response.project){
          // If I receive the response
          this.status = "succes";
          form.reset(); // Method to clear the form
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

}
