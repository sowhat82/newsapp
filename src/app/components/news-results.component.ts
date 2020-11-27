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

  async ngOnInit(): Promise<void> {

    this.countryCode = this.activatedroute.snapshot.params['countryCode']  

 //   this.result = await this.cache.pullFromCache(this.countryCode)
      console.info(this.result)

   const params = new HttpParams()
   .set('country', this.countryCode)
   .set('apiKey', this.apiDB['apiKey'])

  this.result = await this.http.get('https://newsapi.org/v2/top-headlines', { params: params }).toPromise()

   
    this.articles = this.result.articles

    const art: articles ={
      country: this.countryCode,
      articles: this.articles
    }

    this.cache.cacheResults(art)

  }


}
