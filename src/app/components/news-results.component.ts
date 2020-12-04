import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {database} from '../database.service'
import { cache } from '../cache.service';
import { article } from '../models';

@Component({
  selector: 'app-news-results',
  templateUrl: './news-results.component.html',
  styleUrls: ['./news-results.component.css']
})
export class NewsResultsComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private apiDB: database, private http: HttpClient, private cache: cache) { }
  countryCode = ""
  result : any = []
  articles: any [] = []
  counter = 0 


  async ngOnInit(): Promise<void> {
    var cacheArticles : article[]
    var found = false
    this.countryCode = this.activatedroute.snapshot.params['countryCode']  

    cacheArticles = await this.apiDB.pullFromCache(this.countryCode)

    // for (var i = 0; i < this.result.length; i++) {
    //   if((this.result[i].country == this.countryCode) && (this.result[i].timeStamp > new Date(new Date().getTime() - 5*60000)))
    //   {
    //     console.log('found still true')
    //     found = true
    //     this.counter = i  
    //     break
    //   }
   
    // }
      const topUpArticles: number = 30 - cacheArticles.length
      const pageSize: string  = String (topUpArticles)

      const params = new HttpParams()
      .set('country', this.countryCode)
    //  .set('apiKey', this.apiDB['apiKey'])
      .set('pageSize', pageSize)
  
      // check how many articles required to be retrieved to top up to 30
      if (topUpArticles > 0){
        this.result = await this.http.get('https://newsapi.org/v2/top-headlines', { params: params, 
        headers: new HttpHeaders().set("X-Api-Key", this.apiDB['apiKey']) }).toPromise()  

        this.articles = this.result.articles

        for (var i = 0; i < this.articles.length; i++) {
          const art: article = {
            country: this.countryCode,
            articleDetails: this.articles[i],
            timeStamp: new Date(),
            saved: false
          }
          this.apiDB.addArticle(art)
        }
      }
      else{
        console.info('still have articles')
      }

      var counter = 0
      for (var i = 0; i < cacheArticles.length; i++) {
        counter++
        this.articles.push(cacheArticles[i].articleDetails)
      }
      console.info('articles pulled from cache', counter)
    }

  async saveArticle(title: string, author: string){

    console.info(title, this.countryCode)
    const result = await this.apiDB.saveArticle(this.countryCode, title)
    console.info(result)
  }


}
