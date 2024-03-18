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
        let headers = new HttpHeaders().set('Content-Type',"application/json"); // We set up the headers (how the information wil be sent)

        // We make an AJAX petition using the GET method
        return this._http.get(this.url + 'projects', {headers: headers}); // We pass the URL of our API, concatenate the API method, and the headers.
    }

    // Method to obtain a single project
    getProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json'); // We set up the headers (how the information wil be sent)

        // We make an AJAX petition using the GET method
        return this._http.get(this.url + 'project/'+id, {headers: headers}); // We pass the URL of our API, concatenate the API method with the id param, and for the last, the headers.

    }

    // Method to delete a project
    deleteProject(id:any){
        let headers = new HttpHeaders().set('Content-Type','application/json'); // We set up the headers (how the information wil be sent)

        // We make an AJAX petition using Delete method
        return this._http.delete(this.url + 'project/'+id, {headers: headers}); // We pass the URL of our API, concatenate the API method with the id param, and for the last, the headers.
    }

    // Method to updated the project
    updateProject(project: any): Observable<any> {
        let params = JSON.stringify(project) // We convert the project to JSON file
        let headers = new HttpHeaders().set('Content-Type','application/json'); // We set up the headers (how the information wil be sent)

        // We make an AJAX petition using Delete method
        return this._http.put(this.url + 'project/'+project._id,params, {headers: headers}); // We pass the URL of our API, concatenate the API method with the id param, and for the last, the headers.

    }


}