import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { FormsModule} from '@angular/forms';
@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent {


  constructor(private Http: HttpClient){}

  center: google.maps.LatLngLiteral = {lat: 44.986656, lng: -93.258133};
  zoom = 8;

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
 

  search: string = "";  

setTime() {
  this.currentTime.setDate(this.currentTime.getDate());
   }



 initialMarker: string = '';  
 
 AddMarkers(event: any) {
  //when you click on the map the googleapi reveals the longitude and latitude 
    this.longitude = event.latLng?.lng(); 
    this.latitude = event.latLng?.lat(); 
   
  //place the longitude and latitude into the backend(weather) api 
    //this.url = `https://localhost:7212/api/WeatherApi?lat=${this.latitude}&lon=${this.longitude}`; 
   // this.url = `http://3.86.96.14/api/WeatherApi?lat=${this.latitude}&lon=${this.longitude}`;
    this.url = `https://weather.tonymdesigns.com/api/WeatherApi?lat=${this.latitude}&lon=${this.longitude}`; 
  //get the temperture based off the backend api
    this.getBackEndApi(this.url); 


   // console.log(this.ultimateArray);
    this.initialMarker = this.Alphabet[this.counter]; 
  

    //this.initialMarker = this.Alphabet[this.counter-1];     
    this.markerPositions.push(event.latLng?.toJSON())
    this.setTime(); 
  
    } 


    Compare: boolean = true; 
    
    ClearMarkers() {
      //clear everything on the map
      this.WeatherApi = ""; 
      this.ultimateArray = []; 
      this.counter = 0; 
      this.Compare = true; 
    }

    CompareMarkers() {
      this.Compare = false;  
    }

    
   showSearch: boolean = false; 
   // put this values in an interface in the future
   BinarySearchLabel : string = ''; 
   BinarySearchLongitude : string = ''; 
   BinarySearchLatitude : string = ''; 
   BinarySearchTemp : string = ''; 

    BinarySearch() {
 //     console.log(this.search); 
      if (this.search=="") {
        console.log('the search reveals nothing right now'); 
      }
      else {
      
        this.ultimateArray.forEach(element => {
          if(element.markerOptions.label==this.search) {
         
            this.BinarySearchTemp = this.convertToFahrenheit1(element.weather.temp);  
            this.BinarySearchLabel = this.search; 
            this.BinarySearchLatitude = element.markerPositions.lat; 
            this.BinarySearchLongitude = element.markerPositions.lng; 
          }
       
        });
    
        this.showSearch = true; 
      }

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
      next: response => {
      //since weatherapi takes the longest to respond everything is dependent on it's value from the backend...
      this.WeatherApi = response
      this.convertToFahrenheit(this.WeatherApi.temp);
      this.ultimateArray.push({markerOptions: {draggable: false, label: this.Alphabet[this.counter++]}, markerPositions: {lat:this.latitude, lng: this.longitude}, weather: this.WeatherApi }); 

      this.setFrontend();      
    }, 
       error: (e) => { console.log(e) }, 
  //  complete: ()=> console.log("Processing complete")

  }); 
  }

  
  convertToFahrenheit(kevlins: number) {
    this.Fahrienheit = (9/5)*(kevlins-273)+32; 
    }

   convertToFahrenheit1(k: number) : string {
    let calc = ((9/5)*(k-273)+32); 
    let convertToSTring = calc.toString(); 
    return convertToSTring; 
   }


}

