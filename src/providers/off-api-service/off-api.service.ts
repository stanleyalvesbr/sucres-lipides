/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   23-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-11-2017
 */

 import { Injectable, Inject } from '@angular/core';
 import { HttpClient } from '@angular/common/http';

 import { Observable } from 'rxjs/Observable';

 import { HttpService } from "../http-service/http.service";
 import { EnvVariables } from '../../app/environment/environment.token';
 import { IEnvironment } from "../../app/environment/env-model";


 @Injectable()
 export abstract class OffApiService extends HttpService {

   private readonly _endpoint:any = {
     base: 'https://fr-en.openfoodfacts.org/api/v0/',
     query: 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=',
     queryOption: '&search_simple=1&json=1',
   };

   constructor(
     public http: HttpClient,
     @Inject(EnvVariables) public readonly envVariables:IEnvironment
   ) {
     super(http,envVariables);
   }

   find(data):Observable<any>{
     if(!data.path){
       return Observable.of([])
     }
     this.path = this._endpoint.query + data.path + this._endpoint.queryOption
     return this.get()
   }

   findByID(data):Observable<any>{
     if(!data.path){
       return Observable.of({})
     }
     this.path = this._endpoint.base + 'product/' + data.path
     return this.get()
   }
 }
