import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public title: string;
  public subtitle: string;
  public email: string;

  constructor() {
    this.title = "Carlos García de Marina";
    this.subtitle = "Desarrollador full stack especializado en el front";
    this.email = "carlosgarciadmarina@gmail.com";
  }

  ngOnInit() {

  }
}
