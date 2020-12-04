import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { database } from '../database.service';
import { country } from '../models';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  
  storedCountries: country[] = []

  constructor(private http: HttpClient, private countryListDB: database ) { }

  result: any

  async ngOnInit(): Promise<void> {
  
    this.storedCountries = await this.countryListDB.getCountries()

    if( this.storedCountries.length == 0){


      this.result= await this.http.get('https://restcountries.eu/rest/v2/alpha?codes=ae;ar;at;au;be;bg;br;ca;ch;cn;co;cu;cz;de;eg;fr;gb;gr;hk;hu;id;ie;il;in;it;jp;kr;lt;lv;ma;mx;my;ng;nl;no;nz;ph;pl;pt;ro;rs;ru;sa;se;sg;si;sk;th;tr;tw;ua;us;ve;za;').toPromise()
      for (var i = 0; i < this.result.length; i++) {

        const country: country = {
          shortName: "",
          longName: "",
          flagImageUrl: ""
        }
  

        country.shortName = this.result[i].alpha2Code;
        country.longName = this.result[i].name;
        country.flagImageUrl = this.result[i].flag;

        await this.countryListDB.addCountry(country)
      }

      this.storedCountries = await this.countryListDB.getCountries()

    }
    else{
      console.info('countries already added')      
      this.storedCountries = await this.countryListDB.getCountries()
    }

    
    // to extract array from API result
//    this.results = this.result['results']

  }

}
