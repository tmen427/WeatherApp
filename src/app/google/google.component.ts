import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 


@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent {


  constructor(private Http: HttpClient){}

  center: google.maps.LatLngLiteral = {lat: 44.986656, lng: -93.258133};
  zoom = 9;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


  url: string = "";
  WeatherApi: any;  
  longitude: number = 0; 
  latitude: number = 0; 
  Frontendlongitude: number = 0; 
  Frontendlatitude: number = 0 ; 
  Error: string = ""; 
  Fahrienheit : number = 0; 
  currentTime = new Date();


setTime() {
  this.currentTime.setDate(this.currentTime.getDate() - 2);
   }


 AddMarkers(event: any) {
  
  //when you click on the map the googleapi reveals the longitude and latitude 
    this.longitude = event.latLng?.lng(); 
    this.latitude = event.latLng?.lat(); 
   
  //place the longitude and latitude into the backend(weather) api 
    //this.url = `https://localhost:7212/api/WeatherApi?lat=${this.latitude}&lon=${this.longitude}`; 
    this.url = `http://3.86.96.14/api/WeatherApi?lat=${this.latitude}&lon=${this.longitude}`; 
  //get the temperture based off the backend api
    this.getBackEndApi(this.url); 
    this.markerPositions.push(event.latLng?.toJSON())
    this.setTime(); 
    } 

  //this method is created in order to synchronize the tempeture api and googlemaps longitued and latiude api on the frontend
  //becuase the googleapi is faster then the weatherapi, they won't be sychronized
  //use the method to place in the latitude and longitude into new variables, and call the method in the observable after the first api is called 
    setFrontend() {
      this.Frontendlatitude = this.latitude; 
      this.Frontendlongitude = this.longitude;  
    }
 
    //observable
  getBackEndApi(frontEndUrl: string) {
    return this.Http.get(frontEndUrl).subscribe({
      next: response => {this.WeatherApi = response
      this.convertToFahrenheit(this.WeatherApi.temp);
      this.setFrontend();      
    }, 
       error: (e) => { console.log(e) }, 
  //  complete: ()=> console.log("Processing complete")

  }); 
  }

  
  convertToFahrenheit(kevlins: number) {
    this.Fahrienheit = (9/5)*(kevlins-273)+32; 
    }


}

