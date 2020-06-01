//import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http'; 
//import { map } from 'rxjs/operators';

//@Injectable()
//export class AuthenticationService {
//    user = new Users(); 
//    constructor(private http: HttpClient) { }
//  baseUrl = "https://mobileapp-rangerapp-qa.azurewebsites.net/api/";
//  login(username: string, password: string) {
//    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
//   // let user = new Users();
//    this.user.Email = username;
//    this.user.Password = password;
//    let body = JSON.stringify(this.user);
//    body = JSON.stringify(body);
//    return this.http.post<any>(this.baseUrl + 'Login', body, httpOptions)
//            .pipe(map(user => {
//                // login successful if there's a jwt token in the response
//              if (user) {
//               // this.user.token='varun'
//                    // store user details and jwt token in local storage to keep user logged in between page refreshes

//                  let userData = JSON.stringify(this.user);
//                  this.user.next(userData);
//                  localStorage.setItem('currentUser', userData);
//                }
//                return this.user;
//            }));
//    }
  
//    logout() {
//        // remove user from local storage to log user out
//        localStorage.removeItem('currentUser');
//    }

//    autoLogin() {
//        const userData = localStorage.getItem('currentUser');
//        if (!userData) {
//            this.user.next(null);
//            return;
//        }
//        this.user.next(userData);
//    }

//}

class Users {
  ID: number;
  Name: string;
  Email: string;
  Phone: string;
  IsOnline: boolean;
  IsActive: boolean;
  Terminalid: number;
  Password: string;
  token?: string;
}



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject,of, throwError } from 'rxjs';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    baseUrl = "https://mobileapp-rangerapp-qa.azurewebsites.net/api/";
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        let user = new Users();
        user.Email = username;
        user.Password = password;

         let body = JSON.stringify(user);
         body = JSON.stringify(body);

      //  return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
        return this.http.post<any>(this.baseUrl + 'Login', body, httpOptions)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user ) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                else
                {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
                    

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}