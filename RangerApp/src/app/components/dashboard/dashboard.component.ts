import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { StreamData } from 'src/app/models/StreamData';
import { SignalRService } from 'src/app/services/signal-r.service';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent } from '../Container/Container.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(ContainerComponent) child: ContainerComponent; 
  streamData: StreamData = new StreamData();
  id: any;
  locationid: number;
  locationidafter: number;
  message: string;

  receiveMessage($event) {
    this.locationid=  this.message = $event
  }
  constructor(private signalRService: SignalRService, private route: ActivatedRoute) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.locationid = currentUser.Terminalid;
      this.id = +this.route.snapshot.paramMap.get('id');
    }
  }
  

  ngOnInit() {
    //this.id = +this.route.snapshot.paramMap.get('id');
    //this.locationid = 17;
    this.signalRService.init();   
    this.signalRService.mxChipData.subscribe(data => {
      this.streamData = JSON.parse(data);
      this.child.filterItemsOfType(this.streamData.from, this.streamData.to)
      
    });
  }

}
