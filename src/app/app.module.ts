import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APIPageComponent } from './components/apipage.component';
import { CountryListComponent } from './components/country-list.component';
import { NewsResultsComponent } from './components/news-results.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { database } from './database.service';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: 'apipage', component: APIPageComponent },
  { path: 'country-list', component: CountryListComponent },
  { path: '', component: HomeComponent },
  { path: 'news-results/:countryCode', component: NewsResultsComponent },
//  { path: 'search/:genre/:q', component: ResultsComponent },
    { path: "**", redirectTo: '/', pathMatch: 'full' },
  ];

@NgModule({
  declarations: [
    AppComponent,
    APIPageComponent,
    CountryListComponent,
    NewsResultsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [database],
  bootstrap: [AppComponent]
})
export class AppModule { }
