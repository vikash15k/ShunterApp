//import { Component, OnInit } from '@angular/core';
//import { Router, ActivatedRoute } from '@angular/router';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { first } from 'rxjs/operators';
//import { AlertService, AuthenticationService } from '../_services';
//import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
//import { MessageBox, MessageBoxButton, MessageBoxStyle } from 'src/app/models/MessageBox';

//@Component({ templateUrl: 'login.component.html' })
//export class LoginComponent implements OnInit {
//  loginForm: FormGroup;
//  loading = false;
//  submitted = false;
//  returnUrl: string;
//  width;
//  constructor(
//    private formBuilder: FormBuilder,
//    private route: ActivatedRoute,
//    private router: Router,
//    private authenticationService: AuthenticationService,
//    private alertService: AlertService,
//    private dialog: MatDialog) {
//    this.width = (this.width !== undefined && this.width !== "px") ? this.width + "px" : "350px";}

//  ngOnInit() {
//    this.loginForm = this.formBuilder.group({
//      username: ['', Validators.required],
//      password: ['', Validators.required]
//    });

//    // reset login status
//    this.authenticationService.logout();

//    // get return url from route parameters or default to '/'
//    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//  }

//  // convenience getter for easy access to form fields
//  get f() { return this.loginForm.controls; }

//  onSubmit() {
//    this.submitted = true;

//    // stop here if form is invalid
//    if (this.loginForm.invalid) {
//      return;
//    }

//    this.loading = true;
//    this.authenticationService.login(this.f.username.value, this.f.password.value)
//      .pipe(first())
//      .subscribe(
//        data => {
//          if (data != undefined || data != null) {
//            if (this.returnUrl == "/Login")
//            {
//              this.returnUrl ="/dashboard/1"
//            }

//            this.router.navigate([this.returnUrl]);
//          }
//          else {
//            MessageBox.display(this.dialog, 'Invalid Credentials....', this.width);
//            this.alertService.error("Invalid Credentials....");
//            this.loading = false;
//          }
//        },
//        error => {
//          this.alertService.error(error);
//          this.loading = false;
//        });
//  }
//}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    if (data.Roleid == undefined) { this.error = "User Not Authorised" }
                    else { this.router.navigate([this.returnUrl]);}
                    
                  
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}