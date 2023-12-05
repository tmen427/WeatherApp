import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
/**
 *
 */
constructor(private Http: HttpClient) {
}
allpionts: any;  
Url: string = "https://weather.tonymdesigns.com/api/"
//local url for the backend
//Url: string: = "https://localhost:7201/api/"; 

ngOnInit() {
    this.getAllPoints(); 
   
  }
   

  getAllPoints():any {
    this.Http.get(this.Url).subscribe({
      next: response => {
      //load all the pionts from the backend 
        this.allpionts = response; 
        console.log(this.allpionts)
    
        for(var i = 0; i<this.allpionts.length; i++) {
          //make markers 
        //  this.ultimateArray.push({markerOptions: {draggable: false, label: this.allpionts[i].comments }, 
       //markerPositions: {lat: parseFloat(this.allpionts[i].latitude), lng: parseFloat(this.allpionts[i].longitude)},  }); 
        }
      }
    })
    return this.allpionts; 
  }
   
  counter: number  = 0; 
  Delete(Id: number) {
    let number_delete = Id; 
    let url = `${this.Url}DeleteByID?id=${number_delete}`;
    this.Http.delete(url).subscribe(data=> {
      console.log(data)
      location.reload(); 
    }); 

  }

}
