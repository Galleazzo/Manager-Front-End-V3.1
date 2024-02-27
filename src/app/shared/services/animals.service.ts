import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from 'environments/environment';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AnimalsService {

    constructor(private _httpClient: HttpClient) { } 


    getAll(): Observable<any> {
        return this._httpClient.get<any[]>(environment.server + `/animals/getAll`)
    }
}