import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { database } from '../database.service';
import { apiForm } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  API_KEY = "" || ""

  constructor(private router: Router, private apiDB: database) { }

  storedApis: apiForm[] = []

  async ngOnInit(): Promise<void> {

    this.storedApis = await this.apiDB.getApi()

  }

  proceed(){

    if (this.API_KEY == ""){
      this.router.navigate(['/apipage'])
    }
    else{
      this.router.navigate(['/country-list'])
    }
  }

  gotoApiPage(apiKey: string){
    
    console.info(apiKey)
    this.apiDB['apiKey'] = apiKey


    this.router.navigate(['/country-list'])

  }

}
