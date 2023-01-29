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
  Alphabet:string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; 
  counter:  number = 0; 
  //the initial values
  markerOptions: google.maps.MarkerOptions = {draggable: false, label: 'first'};

  markerPositions: google.maps.LatLngLiteral[] = [];

  ultimateArray : any[] = []; 

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

    //you have to make this custom array if you want custom labels on your markers, loop thru on the frontend
    this.ultimateArray.push({markerOptions: {draggable: false, label: this.Alphabet[this.counter++]}, markerPositions: {lat:this.latitude, lng: this.longitude} }); 
    console.log(this.ultimateArray); 


    this.markerPositions.push(event.latLng?.toJSON())
   // console.log(event.latLng?.toJSON())
    this.setTime(); 
    } 

    Compare: boolean = true; 
    ClearMarkers() {
      //clear everything on the map
      this.WeatherApi = ""; 
      this.ultimateArray = []; 
    }

    CompareMarkers() {
    //  this.WeatherApi = "";
      this.Compare = false;  
      
    }

    BinarySearch(event: any) {
        console.log(event.target.value); 


    }

  //this method is created in order to synchronize the tempeture api and googlemaps longitued and latiude api on the frontend
  //becuase the googleapi is faster then the weatherapi, they won't be sychronized
  //use the method to place in the latitude and longitude into new variables, and call the method in the observable after the first api is called 
    setFrontend() {
      this.Frontendlatitude = this.latitude; 
      this.Frontendlongitude = this.longitude;  
    }
 

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

