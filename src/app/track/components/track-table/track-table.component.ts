import { Component, OnInit } from '@angular/core';
import { Track } from '../../models/track';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss']
})
export class TrackTableComponent implements OnInit {

  public tracks!: Track[];

  constructor(private service: TrackService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.tracks = data;
    });
  }

  public selectTrack(track: Track) {
    let newTrack = {...track};
    this.service.selectTrack(newTrack);
  }

  public delete(track: Track) {
    this.service.delete(track).subscribe(() => {
      this.service.listAll().subscribe((data) => (this.tracks = data));
    });
  }
}