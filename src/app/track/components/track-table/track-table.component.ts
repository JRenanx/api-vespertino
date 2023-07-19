import { Component, OnInit } from '@angular/core';
import { Track } from '../../models/track';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss'],
})
export class TrackTableComponent {
  
  constructor(private service: TrackService) {}

  public tracks!: Track[];

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.tracks = data;
    });
  }

  public selectItem(track: Track) {
    const newTrack: Track = { ...track };
    this.service.selectItem(newTrack);
  }

  public delete(track: Track) {
    this.service.delete(track).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.tracks = data;
      });
    });
  }
}
