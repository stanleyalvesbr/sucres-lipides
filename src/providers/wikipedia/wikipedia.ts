/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 03-02-2017
*/

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Wikipedia provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WikipediaService {

  data: any;

  constructor(public http: Http) {
    //console.log('Hello Wikipedia Provider');
    this.data = null;
  }
  load(query:string) {

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('https://fr.wikipedia.org/api/rest_v1/page/summary/'+ query)
        .map(res =>res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        },
        error =>  resolve({extract:'inconnu', description:'inconnu'})
      );
    });
  }
}