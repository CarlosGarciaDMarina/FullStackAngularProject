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


}