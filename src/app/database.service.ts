import { GeneratedFile } from '@angular/compiler';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { generate } from 'rxjs';
import { apiForm } from './models';

@Injectable()
export class database extends Dexie {

  apiKey = ""

  private apiForm: Dexie.Table<apiForm, number>;

  constructor() {
    // database name
    super('apiKeys')

    // setup the schema for v1
    this.version(2).stores({
      apiForm: "++id,apiKey"
    })

    // get a reference to the todo collection
    this.apiForm = this.table('apiForm')
  }

  async addApi(a: apiForm): Promise<any> {


    a.apiKey = a.apiKey.trim().toLowerCase()
    this.apiKey = a.apiKey
    console.info(this.apiKey)
      return await this.apiForm.add(a)

  }

  async getApi():Promise<apiForm[]> {
      
    
    return this.apiForm.orderBy('apiKey').toArray()


  }



//   async getSearchOptions():Promise<searchForm[]> {
//     return this.searchForm.orderBy('q').toArray()
//   }
}