//import { Injectable } from '@angular/core';
//import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//@Injectable()
//export class AuthGuard implements CanActivate {

//    constructor(private router: Router) { }

//    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//        if (localStorage.getItem('currentUser')) {
//            // logged in so return true
//            return true;
//        }

//        // not logged in so redirect to login page with the return url
//        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//        return false;
//    }
//}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true

            return true;
        }

        // not logged in so redirect to login page with the return url

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
        //return false;
    }
}


//import { Observable } from 'rxjs';

//import { take, map, tap } from 'rxjs/operators';

//@Injectable()
//export class AuthGuard implements CanActivate {
//    constructor(private router: Router, private afAuth: AngularFireAuth) {
//    }

//    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable {
//        return this.afAuth.authState
//            .pipe(
//                take(1),
//                map(user => !!user),
//                tap(
//                    loggedIn => {
//                        if (!loggedIn) {
//                            this.router.navigate(['/login']);
//                        }
//                    }
//                )
//            );
//    }
//}

