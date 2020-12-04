import { GeneratedFile } from '@angular/compiler';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { generate } from 'rxjs';
import { apiForm, article, country } from './models';

@Injectable()
export class database extends Dexie {


  apiKey = ""

  //collections
  private apiForm: Dexie.Table<apiForm, number>;
  private countryList: Dexie.Table<country, number>;
  private newsArticles: Dexie.Table<article, number>;

  constructor() {
    // database name
    super('newsAppDB')

    // setup the different schemas with their respective unique primary (and secondary) indices
    this.version(5).stores({
      apiForm: "++apiID, apiKey",
      countryList: "++countryID, longName",
      newsArticles: "++articleID, timeStamp, country, articleDetails.title"
    })

    // get a reference to the collection
    this.apiForm = this.table('apiForm')
    this.countryList = this.table('countryList')
    this.newsArticles = this.table('newsArticles')
  }

  async addApi(a: apiForm): Promise<any> {
    a.apiKey = a.apiKey.trim().toLowerCase()
    this.apiKey = a.apiKey
      return await this.apiForm.add(a)
  }

  async getApi():Promise<apiForm[]> {
    return this.apiForm.orderBy('apiKey').toArray()
  }

  async deleteApi(a: apiForm):Promise<apiForm[]> {
    const deleteCount = await this.apiForm
      .where('apiKey').anyOf(a.apiKey)
      .delete()
    return null
  }


 async addCountry(c: country): Promise<any> {
  //  console.info(c)
    return await this.countryList.add(c)
  }

  async getCountries():Promise<country[]> {
    return this.countryList.orderBy('longName').toArray()
  }

  async addArticle(a: article): Promise<any> {
    //  console.info(c)
      return await this.newsArticles.add(a)
    }
  
  async pullFromCache(countryCode: string){

    console.info(new Date(new Date().getTime() - 5*60000))

    await this.newsArticles
      .where('timeStamp').below(new Date(new Date().getTime() - 5*60000))
      .and(item => item.saved !== true)
      .delete()

    return this.newsArticles.where('country').equals(countryCode).toArray()
      
  }

  async saveArticle(countryCode: string, title: string) {
    // return await this.newsArticles.where('[country+title]').anyOf([[countryCode, title]]).toArray()
    return await this.newsArticles.where('articleDetails.title').equals(title).modify({saved: true})
  }

}