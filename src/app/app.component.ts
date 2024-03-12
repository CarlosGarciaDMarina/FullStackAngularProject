import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Imports the HttpClientModule module from Angular to allow making HTTP requests
import { FormsModule } from '@angular/forms'; // Imports the FormsModule module from Angular to work with forms in the application
import { RouterOutlet } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';


// Components
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, // Important to import the router as well in order to work with it.
    RouterModule, // Important to import the routermodule as well in order to work with the directive routerLink
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-angular';
}
