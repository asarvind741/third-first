import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class JobService {

    constructor(
        private httpClient: HttpClient
    ){ }

    saveNewJobPost(jobPost){
        console.log(environment);
        return this.httpClient.post(`${environment.API_URL}/job-posts/create`, jobPost)
    }
}