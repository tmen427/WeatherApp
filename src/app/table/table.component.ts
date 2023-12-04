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

  ngOnInit() {
    this.getAllPoints(); 
   
  }
   

  getAllPoints():any {
    this.Http.get("https://localhost:7201/api").subscribe({
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
    let url = `https://localhost:7201/api/DeleteByID?id=${number_delete}`;
    this.Http.delete(url).subscribe(data=> {
      console.log(data)
      location.reload(); 
    }); 

  }

}
