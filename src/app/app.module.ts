import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'; 
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';

import { GoogleMapsModule } from '@angular/google-maps'; 
import { GoogleComponent } from './google/google.component';


@NgModule({
    declarations: [
        AppComponent,
     
        GoogleComponent
      ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule, HttpClientModule, ReactiveFormsModule, GoogleMapsModule,

    ]
})
export class AppModule { }
