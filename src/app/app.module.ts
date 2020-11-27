import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APIPageComponent } from './apipage/apipage.component';
import { CountryListComponent } from './components/country-list.component';
import { NewsResultsComponent } from './components/news-results.component';

@NgModule({
  declarations: [
    AppComponent,
    APIPageComponent,
    CountryListComponent,
    NewsResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
