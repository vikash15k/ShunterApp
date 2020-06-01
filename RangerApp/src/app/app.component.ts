//import { Component } from '@angular/core';
//import * as Msal from 'msal';
//import { MsalService } from './services/msal.service';


//@Component({
//  selector: 'app-root',
//  templateUrl: './app.component.html',
//  styleUrls: ['./app.component.css']
//})
//export class AppComponent {

//  title = 'RangersApp';
//  constructor(private msalService: MsalService) {
//    //if (!this.isUserLoggedIn()) {
//    //  this.login();
//    //}
   
//  }
  
//  useremail() {
//    let useremail = this.msalService.getUserEmail();
//    return useremail;
//  }

//  login() {
//    this.msalService.login();
//  }

//  signup() {
//    this.msalService.signup();
//  }

//  logout() {
//    this.msalService.logout();
//  }

//  isUserLoggedIn() {
//    return this.msalService.isLoggedIn();
//  }

//}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';

@Component({ selector: 'app-root', templateUrl: 'app.component.html', styleUrls: ['./app.component.css'], animations: [onMainContentChange]})
export class AppComponent {
    currentUser: User;
    public onSideNavChange: boolean;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private _sidenavService: SidenavService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this._sidenavService.sideNavState$.subscribe(res => {
            console.log(res)
            this.onSideNavChange = res;
        })
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

   //redirectRouterLessonUnmatched(req, res) {
   // res.sendFile("index.html", { root: './index.html' });
   // }

   // app.use(redirectRouterLessonUnmatched);

}