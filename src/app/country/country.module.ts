import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './components/country/country.component';
import { CountryFormComponent } from './components/country-form/country-form.component';
import { CountryTableComponent } from './components/country-table/country-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CountryComponent,
    CountryFormComponent,
    CountryTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CountryComponent
  ]
})
export class CountryModule { }
