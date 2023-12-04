import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { GoogleComponent } from './google/google.component';
const routes: Routes = [
  {path: '', component: GoogleComponent},
  { path: 'table', component: TableComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
