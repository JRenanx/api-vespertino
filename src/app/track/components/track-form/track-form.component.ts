import { Component, OnInit } from '@angular/core';
import { Track } from '../../models/track';
import { TrackService } from '../../services/track.service';
import { Country } from '../../../country/models/country';
import { CountryService } from '../../../country/services/country.service';

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss'],
})
export class TrackFormComponent implements OnInit {
  
  public track = {} as Track;

  public tracks!: Track[];

  public countrys!: Country[];

  constructor(
    private service: TrackService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.countryService.listAll().subscribe((country) => {
      this.countrys = country;
    });

    this.service.emitEvent.subscribe({
      next: (res: Track) => {
        this.track = res;
        let country = this.countrys.find((country) => this.track.country.id === country.id )
        if(country !== undefined){
          this.track.country = country;
        }
      },
    })
  }

  public save(){
    if(this.track.id){
      this.service.update(this.track).subscribe((data) => {
        this.track = {} as Track;
      })
    }else{
      this.service.insert(this.track).subscribe((data) => {
        this.track = {} as Track;
      })
    }
  }


  public getTracksByName() {
    this.service.getTracksByName(this.track.name).subscribe((data) => {
      this.tracks = data;
    });
  }
}
