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

    getByCriteria(name: string, page: number, pageSize: number, sort: string, order: string): Observable<any> {
        return this._httpClient.get<any[]>(environment.server + `/animals/getByCriteria?name=${name}&page=${page}&pageSize=${pageSize}&sort=${sort}&order=${order}`)
    }
}