import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {database} from '../database.service'
import { cache } from '../cache.service';
import { articles } from '../models';

@Component({
  selector: 'app-news-results',
  templateUrl: './news-results.component.html',
  styleUrls: ['./news-results.component.css']
})
export class NewsResultsComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private apiDB: database, private http: HttpClient, private cache: cache) { }
  countryCode = ""
  result : any
  articles: []
  counter = 0 

  async ngOnInit(): Promise<void> {
    var found = false
    this.countryCode = this.activatedroute.snapshot.params['countryCode']  
    console.info(this.countryCode)

    this.result = await this.cache.pullFromCache(this.countryCode)

    for (var i = 0; i < this.result.length; i++) {
      if((this.result[i].country == this.countryCode) && (this.result[i].timeStamp > new Date(new Date().getTime() - 5*60000)))
      {
        console.log('found still true')
        found = true
        this.counter = i  
        break
      }
   
    }

    if (found){
      console.info(this.result)
      this.articles = this.result[this.counter].articles
    }
    else {
      console.info('not found')

      const params = new HttpParams()
      .set('country', this.countryCode)
      .set('apiKey', this.apiDB['apiKey'])
      .set('pageSize', "30")
  
      this.result = await this.http.get('https://newsapi.org/v2/top-headlines', { params: params }).toPromise()
  
     
      this.articles = this.result.articles
  
      const art: articles ={
        country: this.countryCode,
        articles: this.articles,
        timeStamp: new Date()
      }
  
      this.cache.cacheResults(art)
    }



  }


}
