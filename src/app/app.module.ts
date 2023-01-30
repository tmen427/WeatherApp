import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'; 
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';

import { GoogleMapsModule } from '@angular/google-maps'; 
import { GoogleComponent } from './google/google.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
     
        GoogleComponent
      ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule, HttpClientModule, ReactiveFormsModule, GoogleMapsModule, FormsModule

    ]
})
export class AppModule { }
