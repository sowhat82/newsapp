import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {database} from '../database.service'
import { apiForm } from '../models';

@Component({
  selector: 'app-apipage',
  templateUrl: './apipage.component.html',
  styleUrls: ['./apipage.component.css']
})
export class APIPageComponent implements OnInit {

  apiForm: FormGroup

  constructor(private fb: FormBuilder, private apiDB: database, private router: Router) { }

  ngOnInit(): void {

    this.apiForm = this.fb.group({
      apiKey: this.fb.control('', [Validators.required]),
      })
  }

  async addApi(){

    const api : apiForm = {
      apiKey: this.apiForm.get('apiKey').value,
      countryList: "ae;ar;at;au;be;bg;br;ca;ch;cn;co;cu;cz;de;eg;fr;gb;gr;hk;hu;id;ie;il;in;it;jp;kr;lt;lv;ma;mx;my;ng;nl;no;nz;ph;pl;pt;ro;rs;ru;sa;se;sg;si;sk;th;tr;tw;ua;us;ve;za;",
      newsArticles: {}
    }

    await this.apiDB.addApi(api)

    this.router.navigate(['/country-list'])
  }

}
