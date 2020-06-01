import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { CustomDateComponent } from "./date-filter.component";
import * as moment from 'moment'
import { RowNode } from 'ag-grid-community';
import { HttpHeaders } from '@angular/common/http';
import 'ag-grid-autocomplete-editor/main.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AutocompleteSelectCellEditor } from 'ag-grid-autocomplete-editor';
import { ExcelService } from 'src/app/services/excel.service';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { MessageBox, MessageBoxButton, MessageBoxStyle } from 'src/app/models/MessageBox';
//import "ag-grid-enterprise";

@Component({
  selector: 'app-FreightForwarder',
  templateUrl: './FreightForwarder.component.html',
  styleUrls: ['./FreightForwarder.component.scss']
})

export class FreightForwarderComponent implements OnInit {
  title = 'FreightForwarder';
  private gridApi;
  private gridColumnApi;
  public defaultColDef;
  public frameworkComponents;
  public rowClassRules;
  @ViewChild('agGrid') agGrid: AgGridNg2;
  locations = [];
  baseUrl = "https://mobileapp-rangerapp-qa.azurewebsites.net/api/";
  titlebox;
  message;
  information;
  button;
  style;
  width;
  allow_outside_click;
  buttons = [
    { value: MessageBoxButton.Ok, display: "Ok" },
    { value: MessageBoxButton.OkCancel, display: "Ok/Cancel" },
    { value: MessageBoxButton.YesNo, display: "Yes/No" },
    { value: MessageBoxButton.AcceptReject, display: "Accept/Reject" },
  ];

  columnDefs = [


    {
      headerName: 'Avg dato', field: 'Avgdato',
      cellRenderer: (data) => {
        return moment(data.value).format('D MMM HH:mm')
      },
      sortable: true, editable: true, width: 100, resizable: true, cellClass: 'rag-border',

      filter: "agDateColumnFilter", filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          //var dateParts = dateAsString.split("-");
          var cellDate = (new Date(dateAsString)).getTime();
          //var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
          if (filterLocalDateAtMidnight.getTime() === cellDate) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    {
      headerName: 'Ank dato', field: 'Ankdato',
      cellRenderer: (data) => {
        return moment(data.value).format('D MMM HH:mm')
      },
      sortable: true, editable: true, width: 100, resizable: true, cellClass: 'rag-border',
      cellFilter: 'date:\' HH:mm:ss\'',
      filter: "agDateColumnFilter", filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          //var dateParts = dateAsString.split("-");
          var cellDate = (new Date(dateAsString)).getTime();
          //var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
          if (filterLocalDateAtMidnight.getTime() === cellDate) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    {
      headerName: 'Fra', field: 'Fra', sortable: true, editable: true, filter: true, width: 100, resizable: true, cellClass: 'rag-border',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        cellHeight: 100,
        values: this.getLocation(),
      }
    },
    {
      headerName: 'Til', field: 'Til', sortable: true, editable: true, filter: true, width: 100, resizable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        cellHeight: 100,
        values: this.getLocation(),
      }
    },
    { headerName: 'Tog / Rutenummer', field: 'Togrutenummer', sortable: true, editable: true, filter: true, width: 100, resizable: true },
    { headerName: 'Rutekode', field: 'Rutekode', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    { headerName: 'Tur nr', field: 'Turnr', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    {
      headerName: 'Lastbærer', field: 'Lastbærer', width: 100, sortable: true, editable: true, filter: true, resizable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        cellHeight: 100,
        values: ['Tralle på tog', 'Container på Bil ', 'Container på tog', 'Bil', 'Tralle på bil']
      }
    },

    { headerName: 'Plombenummer', field: 'Plombenummer', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    { headerName: 'BPX', field: 'Bpx', width: 100, sortable: true, editable: true, filter: "agNumberColumnFilter", resizable: true },
    { headerName: 'Produksjonsvindu 1', field: 'Produksjonsvindu1', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    { headerName: 'Produksjonsvindu 1 Løslast', field: 'Produksjonsvindu1løslast', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    { headerName: 'Produksjonsvindu 2', field: 'Produksjonsvindu2', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    { headerName: 'Produksjonsvindu 2 Løslast', field: 'Produksjonsvindu2løslast', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    { headerName: 'Innholdsbeskrivelse', field: 'Innholdsbeskrivelse', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    { headerName: 'Tildelt', field: 'Lastbarer', sortable: true, width: 100, editable: true, filter: true, resizable: true },
    { headerName: 'Sjåførnavn/merknad', field: 'Drivername', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    { headerName: 'Status', field: 'LastStatus', width: 100, sortable: true, editable: true, filter: true, resizable: true },
    {
      headerName: 'Cont/Bilnr', field: 'Contbilnr', width: 140, sortable: true, editable: true, filter: true,
      resizable: true, cellClass: 'rag-border', pinned: "left", checkboxSelection: true,
      lockPinned: true,
      cellEditor: AutocompleteSelectCellEditor,
      cellEditorParams: {
        autocomplete: {
          fetch: (cellEditor, text, update) => {
            let spinnertimeout;
            let match = text.toLowerCase() || cellEditor.eInput.value.toLowerCase();

            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
              if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                let data = JSON.parse(xmlHttp.responseText);
                let items = data.map(d => ({ label: d.Containername }));
                update(items);
                let editor1 = document.getElementsByClassName('autocomplete')[0];
                if (editor1 != undefined) {
                  editor1['style'].color = 'black';
                  editor1['style'].border = '1px solid black';
                  editor1['style'].backgroundColor = 'white';
                  editor1['style'].fontSize = '12px';
                }
                //console.log('editor1: ', editor1);
              }
              if (xmlHttp.status === 404) {
                update(false);
              }
            };
            xmlHttp.open("GET", this.baseUrl + 'GetMastContainers?name=' + match, true);
            xmlHttp.send(null);
          },
        },
        placeholder: 'Choose Container',
        required: true,
      },
      valueFormatter: (params) => {
        if (params.value) {
          return params.value.label || params.value.value || params.value;
        }
        return "";
      },
    },
    {
      headerName: 'Produksjonsmodell', field: 'Produksjonsmodell', sortable: true, filter: true, width: 130, editable: true, resizable: true,
      pinned: "left",
      lockPinned: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        cellHeight: 100,
        values: ['Pakker', 'Brev', 'BCI', 'Gods', 'Parcels']
      }
    }

  ];

  rowData: any;
  mastContainers: any;
  editType;

  constructor(private http: HttpClient, private excelService: ExcelService, private dialog: MatDialog) {
    this.editType = "fullRow";
    this.width = (this.width !== undefined && this.width !== "px") ? this.width + "px" : "350px";
  }

  exportAsXLSX(): void {
    let containersData = [];
    this.http.get<ConatinersData[]>(this.baseUrl + 'GetContainers/').subscribe(result => {
      result.forEach(function (group) {
        containersData.push(group);
      });
      this.excelService.exportAsExcelFile(containersData, 'data');
    }, error => console.error(error));

  }

  ngOnInit() {

    this.rowData = this.http.get(this.baseUrl + 'GetContainersLimited');
    this.http.get<any[]>(this.baseUrl + 'GetMastContainers?name=').subscribe(result => {
      this.mastContainers = result;
    }, error => console.error(error));
  }

  getLocation(): string[] {
    let filteredArray = [];
    this.http.get<Location[]>(this.baseUrl + 'GetLocations/').subscribe(result => {
      result.forEach(function (group) {
        filteredArray.push(group.TerminalName);
      });
      this.locations = filteredArray;
    }, error => console.error(error));
    return filteredArray;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  //getSelectedRows() {
  //  const selectedNodes = this.agGrid.api.getSelectedNodes();
  //  const selectedData = selectedNodes.map(node => node.data);
  //  const selectedDataStringPresentation = selectedData.map(node => node.Contbilnr + ' ' + node.trainid).join(', ');
  //  alert(`Selected nodes: ${selectedDataStringPresentation}`);
  //}

  selectedNodes: RowNode[];

  isChanged = false;
  cellChanged(event) {
    if (this.isChanged == false)
      if ((event.oldValue == undefined || event.oldValue == null) && (event.newValue == undefined || event.newValue == null)) {

      }
      else {

        if (event.colDef.headerName == 'Avg dato') {
          if (event.data.Avgdato > event.data.Ankdato) {
            MessageBox.display(this.dialog, 'AvgDato cannot be Greater Than AnkDato.', this.width);
            event.data.Avgdato = event.oldValue;
            return;
          }
        }
        //if (event.colDef.headerName == 'Ank dato') {
        //  if (event.data.Avgdato > event.data.Ankdato) {
        //    MessageBox.display(this.dialog, 'AnkDato cannot be Less Than AvgDato.', this.width);
        //    event.data.Avgdato = event.oldValue;
        //    return;
        //  }
        //}
        if (event.colDef.headerName == 'Fra') {
          if (event.data.Fra == event.data.Til) {
            MessageBox.display(this.dialog, 'Source and Destination cannot be same.', this.width).subscribe(result => {
              //const respone = (result === undefined) ? "none" : result.result;
              //MessageBox.show(this.dialog, 'User response :' +respone);
              event.data.Fra = event.oldValue;
            });
            event.data.Fra = event.oldValue;
            return
          }
        }
        //if (event.colDef.headerName == 'Til') {
        //  if (event.data.Fra == event.data.Til) {
        //    MessageBox.display(this.dialog, 'Source and Destination cannot be same.', this.width);
        //    event.data.Til = event.oldValue;
        //    return
        //  }
        //}

        if (event.oldValue != event.newValue)
          this.isChanged = true;
      }

    if (event.colDef.headerName == 'Produksjonsmodell') {
      if (event.data.Fra == event.data.Til) {
        MessageBox.display(this.dialog, 'Source and Destination cannot be same.', this.width);
        return
      }
      if (event.data.Contbilnr == '') {
        MessageBox.display(this.dialog, 'Container Name is mandatory.', this.width);
        return
      }
      else {
        //this.http.get<any[]>(this.baseUrl + 'GetMastContainers?name=' + event.data.Contbilnr).subscribe(result => {
        //  this.mastContainers = result;

        //}, error => console.error(error));
        let containerArray = [];
        if (this.mastContainers != null) {
          containerArray = this.mastContainers.filter(function (loc) {
            if (loc.Containername.indexOf(event.data.Contbilnr) > -1 || loc.Containername.indexOf(event.data.Contbilnr.label) > -1) {
              return loc;
            }
          });
          if (containerArray == undefined || containerArray == null || containerArray.length == 0) {
            MessageBox.display(this.dialog, 'Container Name is wrong.', this.width);
            return
          }
        }
      }

      if (this.isChanged) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        if (event.data.Contbilnr.label != undefined) {
          event.data.Contbilnr = event.data.Contbilnr.label;
        }
        let body = JSON.stringify(event.data);
        body = JSON.stringify(body);
        this.http.post(this.baseUrl + 'UpdateContainer', body, httpOptions
        ).subscribe(
          data => {
            if (data.toString().indexOf("Success") > -1) {
              console.log("post request ", data);
            }
            else {
              console.log("post request failed", data);
            }
          }, error => {
            console.log("ERROR", error);
          })
      }
      this.isChanged = false;
    }
  }

  onAddRow() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length > 1) {
      MessageBox.display(this.dialog, "more than 1 row selected", this.width);
    }
    else {
      const selectedData = selectedNodes.map(node => node.data);
      var newItem = this.createNewRowData(selectedData);
      var res = this.gridApi.updateRowData({ add: [newItem] });
    }
  }

  onDeleteRow() {
    //const selectedNodes = this.agGrid.api.getSelectedNodes();
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    let body = JSON.stringify(selectedData);
    body = JSON.stringify(body);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    this.http.post(this.baseUrl + 'RemoveContainer', body, httpOptions
    ).subscribe(
      data => {
        if (data.toString().indexOf("Success") > -1) {
          console.log("post request ", data);
        }
        else {
          console.log("post request failed", data);
        }
      }, error => {
        console.log("ERROR", error);
      })
  }


  onAddNewRow() {
    var newItem = this.createAddRowData();
    this.gridApi.updateRowData({ add: [newItem] });
  }

  createAddRowData() {
    var newData = {
      Contbilnr: '',
      Produksjonsmodell: '',
      Avgdato: moment(new Date(Date.now())).format(),
      Ankdato: moment(new Date(Date.now())).format(),
      Fra: '',
      Til: '',
      Opprettetav: JSON.parse(localStorage.getItem('currentUser')).Name,
      Endretav: JSON.parse(localStorage.getItem('currentUser')).Name
    };
    return newData;
  }


  createNewRowData(selectedData: any) {
    var newData = {
      Contbilnr: '',
      Produksjonsmodell: selectedData[0].Produksjonsmodell,
      Avgdato: moment(new Date(Date.now())).format(),
      Ankdato: moment(new Date(Date.now())).format(),
      Fra: selectedData[0].Fra,
      Til: selectedData[0].Til,
      Togrutenummer: selectedData[0].Togrutenummer,
      Opprettetav: JSON.parse(localStorage.getItem('currentUser')).Name,
      Endretav: JSON.parse(localStorage.getItem('currentUser')).Name
    };
    return newData;
  }
}

class Location {
  TerminalName: String
}
class ConatinersData {
  Fra: string;
  Til: string;
  Contbilnr: string;
}


