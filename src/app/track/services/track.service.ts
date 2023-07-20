import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Track } from '../models/track';
import { Country } from '../../country/models/country';
import { GlobalServiceService } from '../../global-service.services';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(
    private http: HttpClient,
    private globalService: GlobalServiceService
  ) {}

  private trackSubject = new Subject<Track[]>();
  public emitEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/tracks';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<Track[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    this.http
      .get<Track[]>(this.urlBase, httpOptions)
      .subscribe((tracks) => this.trackSubject.next(tracks));
    return this.trackSubject.asObservable();
  }

  public getTracksByName(name: string): Observable<Track[]> {
    if (name === '') {
      return this.listAll();
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.globalService.token,
        }),
      };
      let url = `${this.urlBase}/partName/${name}`;
      this.http
        .get<Track[]>(url, httpOptions)
        .subscribe((tracks) => this.trackSubject.next(tracks));
      return this.trackSubject.asObservable();
    }
  }

  public getByCountry(country: Country): Observable<Track[]> {
    this.http
      .get<Track[]>(`${this.urlBase}/country/${country.id}`)
      .subscribe((speedways) => this.trackSubject.next(speedways));
    return this.trackSubject.asObservable();
  }

  public insert(track: Track): Observable<Track> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.post<Track>(this.urlBase, track, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(track: Track): Observable<Track> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.post<Track>(this.urlBase, track, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public delete(track: Track): Observable<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${track.id}`, httpOptions);
  }

  public selectItem(track: Track) {
    this.emitEvent.emit(track);
  }
}
