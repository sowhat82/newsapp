import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {database} from '../database.service'

@Component({
  selector: 'app-news-results',
  templateUrl: './news-results.component.html',
  styleUrls: ['./news-results.component.css']
})
export class NewsResultsComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private apiDB: database, private http: HttpClient) { }
  countryCode = ""
  result : any
  articles: []

  async ngOnInit(): Promise<void> {

    this.countryCode = this.activatedroute.snapshot.params['countryCode']  



   const params = new HttpParams()
   .set('country', this.countryCode)
   .set('apiKey', this.apiDB['apiKey'])

  this.result = await this.http.get('https://newsapi.org/v2/top-headlines', { params: params }).toPromise()

  console.info(this.result)
   
    this.articles = this.result.articles

  }

}
