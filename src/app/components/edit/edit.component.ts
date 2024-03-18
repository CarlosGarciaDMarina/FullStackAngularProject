import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';import { Project } from '../../models/projects';
import { ProjectService } from '../../services/projects.service';
import { FormsModule } from '@angular/forms'; // We must declare the library to work with Angular forms
import { UploadService } from '../../services/upload.service'; // We load the service to use the function
import { Global } from '../../services/global'; // we import this for use the url
import { Router, ActivatedRoute, Params } from '@angular/router'; // We need it for acces to the id of the project

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    // We must declare the component to work with it
    RouterOutlet, // Important to import the router as well in order to work with it.
    RouterModule, // Important to import the routermodule as well in order to work with the directive routerLink
    FormsModule,
    CommonModule
  ],
  templateUrl: '../create/create.component.html',
  styleUrl: './edit.component.css',
  providers: [
    ProjectService,
    UploadService // Load the service
  ]
})
export class EditComponent implements OnInit{
  public url: string;
  public title: string;
  public project: Project;
  public save_project: any;
  public status: string = "";
  public filesToUpload: Array<File> = [];


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService, // Cargamos la propiedad en la clase
    private _router: Router,
    private _route: ActivatedRoute

  ) {
    this.url = Global.url;
    this.title = "Editar Proyecto";
    this.project = new Project('', '', '', '', 2024, '','');
  }
  
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this.getProject(id);
    });
  }

  getProject(id: any){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project= response.project;
      }, 
      error => {
        console.log(<any>error);
      }
    );
  }

  // Método 
  onSubmit(form:any){
    /* Guardar los datos básicos */
    // Utilizamos el método updateProject que hemos creado en projectService, le pasamos el project y utilizamos el metodo subscribe para recoger la respuesta
    this._projectService.updateProject(this.project).subscribe( // Subscribe tiene 2 funciones de callback
      response => {
        //Recogemos la respuesta
        if(response.projectUpdated){
          // Si me llega la respuesta 
          if(this.filesToUpload){
            /* Hace el update */
            this._uploadService.makeFileRequest(Global.url + "upload-image/"+response.projectUpdated._id, [],this.filesToUpload, 'image')
            .then((result:any) => {  
                this.save_project = result.project;
                this.status = "succes";
            }); 
          } else {
            this.save_project = response.project;
            this.status = "succes";
          }
        } else {
          // Si no me llega
          console.log(response);
          this.status = "failed";
        }
      }, 
      error => {
        // Recogemos el error y lo mostramos en la consola
        console.log(error);
      } 
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }

}
