import { Component, OnInit, Input, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { config } from '../../config';
import { HttpClient, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { StreamData } from 'src/app/models/StreamData';


@Component({
  selector: 'app-Container',
  templateUrl: './Container.component.html',
  styleUrls: ['./Container.component.css'],
  providers: [StreamData]
})


export class ContainerComponent implements OnInit, OnDestroy {
  @Input() locationid: number;
  @Input() id: any;
  @Input() from: any;
  @Input() to: any;
  @Input() flag: any;
  @Input() searchModel;

  @Output() messageEvent = new EventEmitter<string>();

 
  

  gaugeValue: any;
  config = config;
  selected: number;

  thresholdConfig = {
    '0': { color: 'green' },
    '40': { color: 'orange' },
    '75': { color: 'red' }
  };
  isExpanded = false;
  drivers: Users[];
  events: Containers[];
  containerHistory: ContainerHistory[];
  locations: Location[];
  http: HttpClient;
  baseUrl = "https://mobileapp-rangerapp-qa.azurewebsites.net/api/";
  id1: any = 0;
  isVisible: boolean;
  displayDriverView: boolean = true;
  driver: Users;
  container: Containers;
  message: string;
  inwardselected: number;
  outwardselected: number;
  bindstatusselected: number;
  bindinward: Steps[];
  bindoutward: Steps[];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  bindstatus: Steps[] = [
    { value: 1, viewValue: 'Assigned' },
    { value: 0, viewValue: 'Arrived' },
    { value: 2, viewValue: 'Accepted' },
    { value: 3, viewValue: 'Rejected' },
    { value: 4, viewValue: 'Departed' },
  ];
  inwardsteps: Steps[] = [
    { value: 1, viewValue: 'Train Station' },
    { value: 2, viewValue: 'Terminal Gate' },
    { value: 4, viewValue: 'Unloading Area' },
    { value: 5, viewValue: 'Parking Area' },
  ];

  outwardsteps: Steps[] = [
    { value: 3, viewValue: 'Loading Area' },
    { value: 2, viewValue: 'Terminal Gate' },
    { value: 1, viewValue: 'Train Station' },
    { value: 5, viewValue: 'Parking Area' },
  ];

  constructor(http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog, public dropdown: MatSelectModule, public dataservice: StreamData) {
    this.http = http;
    this.isVisible = false;
    //this.getDriverList();

  }

  getDriverList() {
    this.http.get<Users[]>(this.baseUrl + 'GetDriverList?id=' + this.locationid).subscribe(result => {
      this.drivers = result;
    }, error => console.error(error));

  }

  DriverClick(driver: Users) {
    this.driver = driver;
    this.displayDriverView = false;
    
  }

  DisplayDiv(element: Containers) {
    this.getDriverList();
    this.bindoutward = null
    this.bindinward = null
    this.inwardselected = undefined;
    this.outwardselected = undefined
    this.container = element;
    this.isVisible = true;
    this.GetContainerHistory(element.ID)
    let filteredArray = [];
    if (element.isIncoming) {
      this.inwardsteps.forEach(function (group) {
        if (element.LastStatus < 19 && element.LastStatus > 9 && group.value > 1) {
          filteredArray.push(group)
        }
        else if (element.LastStatus < 29 && element.LastStatus > 19 && group.value > 2) {
          filteredArray.push(group)
        }
        else if (element.LastStatus < 39 && element.LastStatus > 29 && group.value > 3) {
          filteredArray.push(group)
        }
        else if (element.LastStatus < 49 && element.LastStatus > 39 && group.value > 4) {
          filteredArray.push(group)
        }

      });
      this.bindinward = filteredArray;
      this.inwardselected = filteredArray[0] != undefined ? filteredArray[0].value : undefined;
      switch (this.inwardselected) {
        case 1:
          element.srctil = 'dist/assets/image/icon_train.png';
          break;
        case 2:
          element.srctil = 'dist/assets/image/icon_hub.png';
          break;
        case 3:
          element.srctil = 'dist/assets/image/icons_loading.png';
          break;
        case 4:
          element.srctil = 'dist/assets/image/icon_unloading.png';
          break;
        case 5:
              element.srctil = 'dist/assets/image/icon_parking.png';
          break;
      }
    }
    else {
      this.outwardsteps.forEach(function (group) {
        if (element.LastStatus < 59 && element.LastStatus > 49 && group.value < 5) {
          filteredArray.push(group)
        }
        else if (element.LastStatus < 49 && element.LastStatus > 39 && group.value < 4) {
          filteredArray.push(group)
        }
        else if (element.LastStatus < 39 && element.LastStatus > 29 && (group.value < 3 || group.value == 5)) {
          filteredArray.push(group)
        }
        else if (element.LastStatus < 29 && element.LastStatus > 19 && group.value < 2) {
          filteredArray.push(group)
        }
        else if (element.LastStatus < 19 && element.LastStatus > 9 && group.value == 5) {
          filteredArray.push(group)
        }

      });
      this.bindoutward = filteredArray;
      this.outwardselected = filteredArray[0] != undefined ? filteredArray[0].value : undefined;
      switch (this.outwardselected) {
        case 1:
              element.srctil = 'dist/assets/image/icon_train.png';
          break;
        case 2:
          element.srctil = 'dist/assets/image/icon_hub.png';
          break;
        case 3:
              element.srctil = 'dist/assets/image/icons_loading.png';
          break;
        case 4:
              element.srctil = 'dist/assets/image/icon_unloading.png';
          break;
        case 5:
              element.srctil = 'dist/assets/image/icon_parking.png';
          break;
      }
      this.bindstatusselected = this.bindstatus[0] != undefined ? this.bindstatus[0].value : undefined
    }



  }

  filterData(id: number) {
    let locations = [];
    if (this.locations != undefined) {
      locations = this.locations.filter(function (loc) {
        if (loc.Id == id) {
          return loc.TerminalName;
        }
      });
    }

    this.events.forEach(function (group) {
      group.PriorityClass = group.Bpx > 0 ? 'glyphicon glyphicon-star' : '';
      if (group.Til == locations[0].TerminalName) {
        group.isIncoming = true;
      }
      switch (group.LastStatus) {
        case 10:
              group.src = 'dist/assets/image/icon_train.png';
          group.colorstyle = 'gray';
          break;
        case 11:
              group.src = 'dist/assets/image/icon_train.png';
          group.colorstyle = 'Yellow';
          break;
        case 12:
              group.src = 'dist/assets/image/icon_train.png';
          group.colorstyle = 'orange';
          break;
        case 13:
              group.src = 'dist/assets/image/icon_train.png';
          group.colorstyle = 'red';
          break;
        case 14:
              group.src = 'dist/assets/image/icon_train.png';
          group.colorstyle = 'blue';
          break;
        case 20:
          group.src = 'dist/assets/image/icon_hub.png';
          group.colorstyle = 'gray';
          break;
        case 21:
          group.src = 'dist/assets/image/icon_hub.png';
          group.colorstyle = 'Yellow';
          break;
        case 22:
          group.src = 'dist/assets/image/icon_hub.png';
          group.colorstyle = 'orange';
          break;
        case 23:
          group.src = 'dist/assets/image/icon_hub.png';
          group.colorstyle = 'red';
          break;
        case 24:
          group.src = 'dist/assets/image/icon_hub.png';
          group.colorstyle = 'blue';
          break;
        case 30:
              group.src = 'dist/assets/image/icons_loading.png';
          group.colorstyle = 'gray';
          break;
        case 31:
              group.src = 'dist/assets/image/icons_loading.png';
          group.colorstyle = 'Yellow';
          break;
        case 32:
              group.src = 'dist/assets/image/icons_loading.png';
          group.colorstyle = 'orange';
          break;
        case 33:
              group.src = 'dist/assets/image/icons_loading.png';
          group.colorstyle = 'red';
          break;
        case 34:
              group.src = 'dist/assets/image/icons_loading.png';
          group.colorstyle = 'blue';
          break;
        case 40:
              group.src = 'dist/assets/image/icon_unloading.png';
          group.colorstyle = 'gray';
          break;
        case 41:
              group.src = 'dist/assets/image/icon_unloading.png';
          group.colorstyle = 'Yellow';
          break;
        case 42:
              group.src = 'dist/assets/image/icon_unloading.png';
          group.colorstyle = 'orange';
          break;
        case 43:
              group.src = 'dist/assets/image/icon_unloading.png';
          group.colorstyle = 'red';
          break;
        case 44:
              group.src = 'dist/assets/image/icon_unloading.png';
          group.colorstyle = 'blue';
          break;
        case 50:
              group.src = 'dist/assets/image/icon_parking.png';
          group.colorstyle = 'gray';
          break;
        case 51:
              group.src = 'dist/assets/image/icon_parking.png';
          group.colorstyle = 'Yellow';
          break;
        case 52:
              group.src = 'dist/assets/image/icon_parking.png';
          group.colorstyle = 'orange';
          break;
        case 53:
              group.src = 'dist/assets/image/icon_parking.png';
          group.colorstyle = 'red';
          break;
        case 54:
              group.src = 'dist/assets/image/icon_parking.png';
          group.colorstyle = 'blue';
          break;

        default:

      }
    });
  }

  GetContainerHistory(tripId: any) {
    let data = { tripID: tripId }
    this.http.get<ContainerHistory[]>(this.baseUrl + 'GetContainerHistory/', { params: data }).subscribe(result => {
      this.containerHistory = result;
      this.containerHistory.forEach(function (group) {
        switch (group.MovingTo) {
          case 1:
                group.srctil = 'dist/assets/image/icon_train.png';
            break;
          case 2:
            group.srctil = 'dist/assets/image/icon_hub.png';
            break;
          case 3:
                group.srctil = 'dist/assets/image/icons_loading.png';
            break;
          case 4:
                group.srctil = 'dist/assets/image/icon_unloading.png';
            break;
          case 5:
                group.srctil = 'dist/assets/image/icon_parking.png';
            break;
        }
        switch (group.Location) {
          case 'TrainStation':
                group.src = 'dist/assets/image/icon_train.png';
            break;
          case 'TerminalGate':
            group.src = 'dist/assets/image/icon_hub.png';
            break;
          case 'LoadingArea':
                group.src = 'dist/assets/image/icons_loading.png';
            break;
          case 'UnloadingArea':
                group.src = 'dist/assets/image/icon_unloading.png';
            break;
          case 'Parking':
                group.src = 'dist/assets/image/icon_parking.png';
            break;
          default:
        }
      });
    }, error => console.error(error));
  }
  locationName: string;

  ngOnInit() {
    let locationslocal = [];
    let locClass = [];
    let selectedLocation: number = this.locationid;
    this.selected = this.locationid;
    this.http.get<Location[]>(this.baseUrl + 'GetLocations/').subscribe(result => {
      this.locations = result;
      locClass = this.locations;
      locationslocal = locClass.filter(function (loc) {
        if (loc.Id == selectedLocation) {
          return loc.TerminalName;
        }
      });
      this.locationName = locationslocal[0].TerminalName;
    }, error => console.error(error));


    this.route.params.subscribe(val => {
      this.isVisible = false;
      this.id1 = this.route.snapshot.paramMap.get('id');
      if (this.id1 == null) { this.id1 = 0 }
      this.displayDriverView = true;
      this.events = null;
      this.GetContainterForLocation();
      this.message = "";
    });
  }

  ngOnDestroy() {
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  trackElement(index: number, element: any) {
    return element ? element.containerId : null;
  }

  onChangeLocation() {
    this.locationid = this.selected;
    let index: number;
    index = this.selected;
    this.GetContainterForLocation();
    this.messageEvent.emit(this.selected.toString());
    let location = [];
    location = this.locations.filter(function (loc) {
      if (loc.Id == index) {
        return loc.TerminalName;
      }
    });
    this.locationName = location[0].TerminalName;
  }

  create() {
    //alert(this.message)
    let combinedClass = new CombinedClass();
    this.isVisible = false;
    this.displayDriverView = true;
    let eventmessage = new EventMessages();
    eventmessage.Container = this.container.Contbilnr;
    if (this.container.isIncoming) {
      eventmessage.MovingTo = this.inwardselected;
    }
    else {
      eventmessage.MovingTo = this.outwardselected;
    }
    eventmessage.Status = parseInt((this.container.LastStatus / 10).toString()) * 10 + this.bindstatusselected;
    eventmessage.DriverID = this.driver.ID;
    eventmessage.Message = this.message;

    combinedClass.EventMessages = eventmessage;

    let container = new Containers();
    container.ID = this.container.ID;
    combinedClass.Containers = container;

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //http://mobileapp-rangerapp-qa.azurewebsites.net/api/AssignContainer
    //api/Data/GetEventsWithSourceLocation/
    let body = JSON.stringify(combinedClass);
    body = JSON.stringify(body);
    this.http.post(this.baseUrl + '/AssignContainer', body, httpOptions
    ).subscribe(
      data => {
        console.log("post request sucessful", data);
        this.GetContainterForLocation();
      }, error => {
        console.log("ERROR", error);
      })

    this.http.post(this.baseUrl + '/Notifications?pns=fcm&message=' + this.driver.Email + '&to_tag=Molde', httpOptions).subscribe(
      data => {
        console.log("post request sucessful", data);
      }, error => {
        console.log("ERROR", error);
      })
    this.message = "";

  }

  GetContainterForLocation() {
    const param = new HttpParams()
      .set('id', this.id1)
      .set('sourceLocation', this.selected.toString());
    this.http.get<Containers[]>(this.baseUrl + 'GetEventsWithSourceLocation/', { params: param }).subscribe(result => {
      this.events = result;
      this.filterData(this.selected);
    }, error => console.error(error));
  }
  check(location: any) {
    console.log(location + '-' + Date.now());
  }
  filterItemsOfType(from: any, to: any) {
    if (from == undefined || to == undefined || this.locationName == undefined) { return; }
    if (from == this.locationName || to == this.locationName) {

      const param = new HttpParams()
        .set('id', this.id1)
        .set('sourceLocation', this.selected.toString());
      this.http.get<Containers[]>(this.baseUrl + 'GetEventsWithSourceLocation/', { params: param }).subscribe(result => {
        this.events = result;
        this.filterData(this.selected);
      }, error => console.error(error));
      console.log(from + '-' + to + '-' + Date.now());
    }


  }
}

class CombinedClass {
  Containers: Containers;
  EventMessages: EventMessages;
}

class Containers {
  ID: string;
  Contbilnr: string;
  driverid: number;
  Drivername: string;
  LastStatus: number;
  colorstyle: string;
  PriorityClass: string;
  Til: string;
  Bpx: number;
  src: string;
  srctil: string;
  isIncoming: boolean;
    MovingTo: number;
    Produksjonsmodell: string;
    Avgdato: Date;
    Ankdato: Date;
    Togrutenummer: string;
    Rutekode: string;
    Turnr: string;
    Lastbærer: string;
    Fra: string;
    Innholdsbeskrivelse: string;


}

class EventMessages {
  id: string;
  Container: string;
  DriverID: number;
  Status: number;
  Message: string;
  MovingTo: number;
}

class ContainerHistory {
  ID: string;
  Container: string;
  DriverID: number;
  Status: number;
  Message: string;
  MovingTo: number;
  Name: string;
  src: string;
  srctil: string;
  Location: string;
  CurrentStatus: string;
}

class Users {
  ID: number;
  Name: string;
  Email: string;
  Phone: string;
  IsOnline: boolean;
  IsActive: boolean;
  Terminalid: number;
  Password: string;
}

class Location {
  Id: number;
  TerminalName: string;
}

export interface Steps {
  value: number;
  viewValue: string;
}
