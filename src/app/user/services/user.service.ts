import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private http: HttpClient) {}

  private userSubject = new Subject<User[]>();
  public emitEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/users';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<User[]> {
    this.http
      .get<User[]>(this.urlBase)
      .subscribe((users) => this.userSubject.next(users));
    return this.userSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
    if (name == '') {
      return this.listAll();
    } else {
      let url = `${this.urlBase}/name/${name}`;
      this.http
        .get<User[]>(url)
        .subscribe((users) => this.userSubject.next(users));
      return this.userSubject.asObservable();
    }
  }

  public insert(user: User): Observable<User> {
    return this.http.post<User>(this.urlBase, user, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(user: User): Observable<User> {
    return this.http
      .put<User>(`${this.urlBase}/${user.id}`, user, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(user: User): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`);
  };

  public selectUser(user: User) {
    this.emitEvent.emit(user);
  };
}
