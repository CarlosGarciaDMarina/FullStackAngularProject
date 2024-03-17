import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/projects';
import { ProjectService } from '../../services/projects.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule // Important to import this module in order to be able to use directives
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

  constructor(
    // Declare dependencies for the project service (_projectService), router (_router), and activated route (_route).
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.url = Global.url;
    this.project = new Project("","","","",0,"",""); // we initialize the object

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

}
