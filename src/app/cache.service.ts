import { GeneratedFile } from '@angular/compiler';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { generate } from 'rxjs';
import { article } from './models';

@Injectable()
export class cache extends Dexie {

  private cacheForm: Dexie.Table<article, number>;

  constructor() {
    // database name
    super('cache')

    // setup the schema for v1
    this.version(2).stores({
      cacheForm: "++id, article"
    })

    // get a reference to the todo collection
    this.cacheForm = this.table('cacheForm')
  }


  async cacheResults(a: article){
    
      return await this.cacheForm.add(a)
  }

  pullFromCache(countryCode: string){

//    return this.cacheForm.where('country').equals('countryCode')
   return this.cacheForm.toArray()

}

}