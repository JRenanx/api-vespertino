import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Country } from '../models/country';
import { GlobalServiceService } from '../../global-service.services';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient,
    private globalService: GlobalServiceService) {}

  private countrySubject = new Subject<Country[]>();
  public emitEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/countrys';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.globalService.token,
    }),
  };

  public listAll(): Observable<Country[]> {
    let httpOptions = {  
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    this.http
      .get<Country[]>(this.urlBase, httpOptions)
      .subscribe((countrys) => this.countrySubject.next(countrys));
    return this.countrySubject.asObservable();
  }

  public getCountrysByName(name: string): Observable<Country[]> {
    if (name === '') {
      return this.listAll();
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.globalService.token,
        }),
      };
      let url = `${this.urlBase}/name/${name}`;
      this.http
        .get<Country[]>(url, httpOptions)
        .subscribe((countrys) => this.countrySubject.next(countrys));
      return this.countrySubject.asObservable();
    }
  }

  public insert(country: Country): Observable<Country> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.post<Country>(this.urlBase, country, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(country: Country): Observable<Country> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http
      .put<Country>(`${this.urlBase}/${country.id}`, country, httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(country: Country): Observable<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${country.id}`, httpOptions);
  }

  public selectItem(country: Country) {
    this.emitEvent.emit(country);
  }
}
