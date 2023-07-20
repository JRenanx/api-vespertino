import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, tap } from 'rxjs';
import { GlobalServiceService } from '../../global-service.services';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private globalService: GlobalServiceService
  ) {}

  private userSubject = new Subject<User[]>();
  public emitEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/users';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.globalService.token,
    }),
  };

  public listAll(): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    this.http.get<User[]>(this.urlBase, httpOptions).subscribe((users) => {
      this.userSubject.next(users);
    });
    return this.userSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
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
        .get<User[]>(url, httpOptions)
        .subscribe((users) => this.userSubject.next(users));
      return this.userSubject.asObservable();
    }
  }

  public insert(user: User): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.post<User>(this.urlBase, user, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(user: User): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http
      .put<User>(`${this.urlBase}/${user.id}`, user, httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(user: User): Observable<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, httpOptions);
  }

  public selectItem(user: User) {
    this.emitEvent.emit(user);
  }
}
