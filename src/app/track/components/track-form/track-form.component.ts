import { Component } from '@angular/core';
import { Track } from '../../models/track';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss']
})
export class TrackFormComponent {

  public tracks!: Track[];
  public track = {} as Track;

  constructor(private service: TrackService) {}

  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: Track) => {
        this.track = res;
      },
    });
  }

  public insertTrack() {
    if (this.track.id) {
      this.service.update(this.track).subscribe((data) => {
        this.track = {} as Track;
      });
    } else {
      this.service.insert(this.track).subscribe((data) => {
        this.track = {} as Track;
      });
    }
  }

  public getTracksByName() {
    this.service.getTracksByName(this.track.name).subscribe((data) => {
      this.tracks = data;
    });
  }
}