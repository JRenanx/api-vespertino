import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackComponent } from './components/track/track.component';
import { TrackFormComponent } from './components/track-form/track-form.component';
import { TrackTableComponent } from './components/track-table/track-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TrackComponent,
    TrackFormComponent,
    TrackTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    TrackComponent
  ]
})
export class TrackModule { }
