import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  
  constructor(private http: HttpClient) {}

  private trackSubject = new Subject<Track[]>();
  public emitEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/pistas';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<Track[]> {
    this.http
      .get<Track[]>(this.urlBase)
      .subscribe((track) => this.trackSubject.next(track));
    return this.trackSubject.asObservable();
  }

  public getTracksByName(name: string): Observable<Track[]> {
    if (name == '') {
      return this.listAll();
    } else {
      let url = `${this.urlBase}/name/${name}`;
      this.http
        .get<Track[]>(url)
        .subscribe((track) => this.trackSubject.next(track));
      return this.trackSubject.asObservable();
    }
  }

  public insert(track: Track): Observable<Track> {
    return this.http.post<Track>(this.urlBase, track, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(track: Track): Observable<Track> {
    return this.http
      .put<Track>(`${this.urlBase}/${track.id}`, track, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(track: Track): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${track.id}`);
  };

  public selectTrack(track: Track) {
    this.emitEvent.emit(track);
  };
}
