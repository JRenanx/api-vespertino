import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private userSubject = new Subject<User[]>();
  public selectUserEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/users';

  public listAll(): Observable<User[]> {
    this.http.get<User[]>(this.urlBase).subscribe(users => this.userSubject.next(users));
    return this.userSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
    let url = `${this.urlBase}/name/${name}`;
    return this.http.get<User[]>(url);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlBase, user);
  }

  public getUserById(id: number): Observable<User> {
    let url = `${this.urlBase}/${id}`;
    return this.http.get<User>(url);
  }

  public updateUser(user: User): Observable<User> {
    let url = `${this.urlBase}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  public deleteUser(userId: number): Observable<void> {
    const url = `${this.urlBase}/${userId}`;
    return this.http.delete<void>(url);
  }

  public getName(name: string) {
    this.selectUserEvent.emit(name)
  }
}
