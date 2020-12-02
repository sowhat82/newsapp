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
    }

    await this.apiDB.addApi(api)

    this.router.navigate(['/country-list'])
  }

  async deleteApi(){

    const api : apiForm = {
      apiKey: this.apiForm.get('apiKey').value,
    }

    await this.apiDB.deleteApi(api)

    this.router.navigate(['/'])
  }

}
