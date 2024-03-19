import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/projects';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  providers: []
})
export class ContactComponent implements OnInit {

  // Variable
  public title: string;
  public project: Project;

  constructor(){
    this.title = "Formulario de contacto";
    this.project = new Project('', '', '', '', 2024, '','');


  }

  ngOnInit(): void {
      
  }
}
