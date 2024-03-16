// Imports
import { Injectable } from "@angular/core";
import { Global } from "./global";

// Decorator
@Injectable()
export class UploadService {
    // We declare the variables
    public url: string;

    // We define the constructor and inizialize the variables
    constructor(){
        this.url = Global.url;
    }

    // This method allows us to perform a classic AJAX request in which we attach a file to upload to the project
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
        // We create a promise with a callback function to which we will give two values
        return new Promise(function(resolve, reject){
            var formData: any = new FormData(); // Variable that simulates a classic form
            var xhr = new XMLHttpRequest(); // xhr is synonymous with AJAX, containing an object for asynchronous requests

            // We iterate through the array of files that will come to us
            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name); // We attach to the form the fields that we are going to take from the array
            }

            // AJAX request, when there is a change, it executes a function
            xhr.onreadystatechange = function(){
                // If it is 4, it means that the operation is completed
                if(xhr.readyState == 4){
                    // We check the status
                    if(xhr.status == 200){
                        // If it is 200, we execute the promise's resolve and parse the response returned by the service
                        resolve(JSON.parse(xhr.response));
                    } else {
                        // If not, we use the reject and pass the response as a parameter
                        reject(xhr.response);
                    }
                }
            }
            
            // We make the request using POST with .open to make the AJAX request, with the url value and the last parameter as true to make the request
            xhr.open('POST', url, true);
            // We define that it sends the form with .send
            xhr.send(formData);
        });
    } //End makeFileRequest()











}