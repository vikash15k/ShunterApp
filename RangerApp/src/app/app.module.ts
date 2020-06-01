import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatCardModule, MatSelectModule, MatTableModule } from '@angular/material';
//import { MatDialogModule, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
//import { MatInputModule } from "@angular/material/input";
//import { MatFormFieldModule } from "@angular/material/form-field";
//import { MatRadioModule } from "@angular/material/radio";
//import { MatToolbarModule } from "@angular/material/toolbar";
//import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignalRService } from './services/signal-r.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContainerComponent } from './components/Container/Container.component';
import { FreightForwarderComponent } from './components/FreightForwarder/FreightForwarder.component';
import { AgGridModule } from 'ag-grid-angular';
import { CustomDateComponent } from "./components/FreightForwarder/date-filter.component";
import { SearchComponent } from './components/search/search.component';
import { ContainerFilterPipe } from './components/Container/Container-filter.pipe';
import { MsalService } from './services/msal.service';
import { ExcelService } from './services/excel.service';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { fakeBackendProvider } from './_helpers';
import { AlertComponent } from './_directives';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { SimpleDialogComponent } from "./components/simple-dialog/simple-dialog.component";
import { MaterialModule } from './material';
import { SidenavService } from './services/sidenav.service'
import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'RangerApp', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'Container/:id', component: ContainerComponent, canActivate: [AuthGuard]
  },
  {
    path: 'FreightForwarder', component: FreightForwarderComponent, canActivate: [AuthGuard]
  }
  , { path: '**', redirectTo: '' }
];
//export const protectedResourceMap: [string, string[]][] = [['http://localhost:58247//RangerApp//Index.Html', ['https://MEAPPostenB2CTest.onmicrosoft.com/RangerApp/write']]];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DashboardComponent,
    ContainerComponent,
    FreightForwarderComponent,
    AlertComponent,
    LoginComponent,
    CustomDateComponent,
    SearchComponent, ContainerFilterPipe,
    SimpleDialogComponent
  ],
  entryComponents: [
    SimpleDialogComponent
  ],
    imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    //AppRoutingModule,
    //MsalModule.forRoot({
    //  authority: "https://meappostenb2ctest.b2clogin.com/d529089f-1c7f-4e34-891f-f685fb9d1e7b/v2.0/",
    //  consentScopes: ["https://MEAPPostenB2CTest.onmicrosoft.com/RangerApp/write"],
    //  clientID: "d61c9f83-4648-4194-8e48-2f9de370f5bf",
    //  popUp: true,
    //  protectedResourceMap: protectedResourceMap,
    //  postLogoutRedirectUri: "http://localhost:58247//",
    //  logger: loggerCallback,
    //  level: LogLevel.Verbose
    //}),

    HttpClientModule, AgGridModule.withComponents([CustomDateComponent]),
    //MatButtonModule, MatCheckboxModule,
    FormsModule,
    MaterialModule,
    //MatMenuModule, MatCardModule, MatDialogModule,
    //    MatSelectModule,
        BrowserAnimationsModule,
    //    MatTableModule,
    //MatInputModule,
    //MatFormFieldModule,
    //MatCheckboxModule,
    //MatButtonModule,
    //MatCardModule,
    //MatIconModule,
    //MatDialogModule,
    //MatRadioModule,
    //MatToolbarModule,
    RouterModule.forRoot(routes, { useHash:true })

  ],
  exports: [RouterModule
  ],

  providers: [
    SignalRService,
    AuthGuard,
    AlertService,
      AuthenticationService,
      SidenavService,
      UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //{provide: MAT_DIALOG_DATA, useValue: {}},
    // provider used to create fake backend
    //fakeBackendProvider,
    MsalService,
    ExcelService,
    //{
    //  provide: HTTP_INTERCEPTORS,
    //  useClass: MsalInterceptor,
    //  multi:true
    //}
  ],
  bootstrap: [AppComponent]
})
//export class AppModule { }
//import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';

//@NgModule({
//    declarations: [
//        AppComponent
//    ],
//    imports: [
//        BrowserModule,
//        AppRoutingModule
//    ],
//    providers: [],
//    bootstrap: [AppComponent]
//})
export class AppModule { }
