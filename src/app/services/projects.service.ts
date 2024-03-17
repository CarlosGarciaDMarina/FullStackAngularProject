import { Injectable } from "@angular/core"; // Library for injecting services
import { HttpClient, HttpHeaders } from "@angular/common/http"; // Library for making AJAX requests
import { Observable } from "rxjs"; // Library for handling asynchronous data streams
import { Project } from "../models/projects"; // Imports the Project data model
import { Global } from "./global" // Imports the global.ts file that contains global variables

@Injectable()
export class ProjectService{
    public url:string; // Here we will store the URL of our API

    constructor (
        private _http: HttpClient // Load HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de Angular';
    }

    // Method for save a project in a database
    saveProject(project: Project): Observable<any>{
        let params = JSON.stringify(project); // It will store the data we provide in JSON format.
        let headers = new HttpHeaders().set('Content-Type','application/json'); // We set up the headers (how the information wil be sent)

        // To register something in the API, we need to use the following method.
        return this._http.post(this.url + 'save-project', params, {headers: headers}); // We pass the URL of our API, concatenate the API method, pass the parameters, and the headers.
    }

    // Method to obtain projects from the database
    getProjects(): Observable<any> {
        // We declare a variable to send information in JSON format
        let headers = new HttpHeaders().set('Content-Type',"application/json");

        // We make an AJAX petition using the GET method
        return this._http.get(this.url + 'projects', {headers: headers});
    }

    // Method to obtain a single project
    getProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json'); // Establecemos las cabeceras (como se va a enviar la información)

        // Para dar de alta algo en el API necesitamos usar el siguiente metodo
        return this._http.post(this.url + 'project/' + id, {headers: headers}); // le pasamos la url de nuestra API, le concatenamos el metodo de la api, le pasamos la id edl proyecto y los headers

    }

}