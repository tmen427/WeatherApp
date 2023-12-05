import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})




export class GoogleComponent {


  constructor(private Http: HttpClient){}
  
  center: google.maps.LatLngLiteral = {lat: 44.986656, lng: -93.258133};
  zoom = 12;
  
  //the initial values
 // markerOptions: google.maps.MarkerOptions = {draggable: false, label: 'first'};

 // markerPositions: google.maps.LatLngLiteral[] = [];
  
 //remote url for backend
  Url: string = "https://weather.tonymdesigns.com/api/"
//local url for the backend
  //Url: string: = "https://localhost:7201/api/"; 

  ultimateArray : any[] = []; 

  url: string = "";
  BackendResponse: any;  
  showMarkerInformation: boolean = false; 
  longitude: number = 0; 
  latitude: number = 0; 
  Frontendlongitude: number = 0; 
  Frontendlatitude: number = 0 ; 
  Error: string = ""; 
  timeElapsed = Date.now();
  today = new Date(this.timeElapsed).toUTCString();
  allpionts: any;  
  showInformation: boolean = true; 
 applyForm = new FormGroup({
  comments: new FormControl('', [Validators.required, Validators.max(10)]),

});

 AddMarkers(event: any) {
  //when you click on the map the googleapi reveals the longitude and latitude 
    this.longitude = event.latLng?.lng(); 
    this.latitude = event.latLng?.lat(); 
    this.postBackEndApi(this.latitude, this.longitude); 
    } 

  
  //this method is created in order to synchronize the tempeture api and googlemaps longitued and latiude api on the frontend
  //becuase the googleapi is faster then the weatherapi, they won't be sychronized
  //use the method to place in the latitude and longitude into new variables, and call the method in the observable after the first api is called 
    setFrontend() {
      this.Frontendlatitude = this.latitude; 
      this.Frontendlongitude = this.longitude;  
    }
 
    submitApplication() {
     
       // let frontEndUrl = 'https://localhost:7201/api/Home/Put';
        let comment = this.applyForm.value.comments;
              
        var body =  {lat: this.latitude.toString(), lon: this.longitude.toString(), comments: this.applyForm.value.comments}
       //  console.log("IN THE PUT")
       // console.log(body); 
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          });
        
        let options = { headers: headers };
    
        this.Http.put<any>(this.Url+"/Home/Put", body, options).subscribe({
          next: response => {
        
            //don't really need to get the response from the server
      //   this.BackendResponse = response
     
        this.showMarkerInformation = false; 
      //remove the latest entry in the marker array and add 
        this.ultimateArray.pop(); 
        this.ultimateArray.push({markerOptions: {draggable: false, label: comment}, markerPositions: {lat:this.latitude, lng: this.longitude} }); 
    
        this.showInformation = true; 
        this.applyForm.reset(); 
      
          //this is needed for the frontend 
         this.setFrontend();      
        }, 
           error: (e) => { console.log("An error updating!") }, 
    
    
      }); 


    }; 

   
  postBackEndApi(lat: number, lng: number, comment: string = "Food Truck") {
    // https://localhost:7201/api/Weather?Longitude=90&Latitude=90
   // this.url = `http://3.86.96.14/api/WeatherApi?lat=${this.latitude}&lon=${this.longitude}`;
   // this.url = `https://weather.tonymdesigns.com/api/WeatherApi?lat=${this.latitude}&lon=${this.longitude}`; 
  //get the temperture based off the backend api
   // let frontEndUrl = 'https://localhost:7201/api';
    let latitude = lat.toString(); 
    let longitude = lng.toString();

    var body =  {lat: latitude, lon: longitude, comments: comment}
 //   console.log('IN THE POST');
  //  console.log(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      });
    
    let options = { headers: headers };

    return this.Http.post(this.Url, body, options).subscribe({
      next: response => {
    //  console.log('the response from the backendn is: ') 
     //   console.log(response)
     this.showMarkerInformation = true;  
     this.BackendResponse = response
       
    
     this.ultimateArray.push({markerOptions: {draggable: false, label: this.BackendResponse.comments}, markerPositions: {lat:this.latitude, lng: this.longitude} }); 
     // this.showInformation = false; 

      //this is needed for the frontend 
     this.setFrontend();      
    }, 
       error: (e) => { console.log("An error posting"!) }, 


  }); 
  }


  /** 
  getBackEndApi(frontEndUrl: string) {
    return this.Http.get(frontEndUrl).subscribe({
      next: response => {
      //since weatherapi takes the longest to respond everything is dependent on it's value from the backend...
      this.WeatherApi = response
      this.convertToFahrenheit(this.WeatherApi.temp);
      this.ultimateArray.push({markerOptions: {draggable: false, label: this.Alphabet[this.counter++]}, markerPositions: {lat:this.latitude, lng: this.longitude}, weather: this.WeatherApi }); 
      this.showInformation = false; 
      //this.setFrontend();      
    }, 
       error: (e) => { console.log(e) }, 
  //  complete: ()=> console.log("Processing complete")

  }); 
  }
*/
status: string = "";
errorMessage : string = "";  
 DeleteMarkers() {
   //delete the latest marker 
  this.Http.delete(this.Url+'/Delete')
  .subscribe({
      next: data => {
          this.status = 'Delete successful';
          this.showMarkerInformation = false; 
 
          this.ultimateArray.pop(); 

      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  });
 }



  
     
  getAllPoints():any {

    this.Http.get(this.Url).subscribe({
      next: response => {
      //load all the pionts from the backend 
        this.allpionts = response; 
        console.log(this.allpionts)
    
        for(var i = 0; i<this.allpionts.length; i++) {
          //make markers 
          this.ultimateArray.push({markerOptions: {draggable: false, label: this.allpionts[i].comments }, 
       markerPositions: {lat: parseFloat(this.allpionts[i].latitude), lng: parseFloat(this.allpionts[i].longitude)},  }); 
        }
      }
    })
    return this.allpionts; 
  }


  ngOnInit() {
    this.getAllPoints();  
  }




}

