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

  constructor(
    private _projectService: ProjectService
  ) {
    this.title= "Crear proyecto";
    this.project = new Project('', '', '', '', 2024, '','');
  }

  ngOnInit() {

  }

  onSubmit(form:any){
    console.log(this.project);
  }

}
