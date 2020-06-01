import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { MatSidenav } from '@angular/material';
import { onSideNavChange, animateText } from '../animations/animations'
import { SidenavService } from '../services/sidenav.service'

interface Page {
    link: string;
    name: string;
    icon: string;
}

@Component({
  selector: 'app-nav-menu', 
  templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css'],
    animations: [onSideNavChange, animateText]
})
export class NavMenuComponent implements OnInit {
    currentUser: User;

    public sideNavState: boolean = false;
    public linkText: boolean = false;

    public pages: Page[] = [
        { name: 'Inbox', link: 'some-link', icon: 'inbox' },
        { name: 'Starred', link: 'some-link', icon: 'star' },
        { name: 'Send email', link: 'some-link', icon: 'send' },
      
    ]

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private _sidenavService: SidenavService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    ngOnInit() {
    }
    onSinenavToggle() {
        this.sideNavState = !this.sideNavState

        setTimeout(() => {
            this.linkText = this.sideNavState;
        }, 200)
        this._sidenavService.sideNavState$.next(this.sideNavState)
    }


    //@ViewChild('drawer', { static: false })
    //drawer: MatSidenav;

    logout() {
        this.isExpanded = !this.isExpanded;
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

  isExpanded = false;
 // currentUser = JSON.parse(localStorage.getItem('currentUser'));

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
 

}
