import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  baseUrl : string = './assets/data'

  constructor(private http: HttpClient) { }

  public get() : Promise<any>{
    return this.http.get(this.baseUrl + '/models.json').toPromise();
  }
}
