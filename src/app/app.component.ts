import 'ag-grid-enterprise';

import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  gridApi;
  gridColumnApi;
  public rowData: [];
  public columnDefs;
  public defaultColDef;
  public autoGroupColumnDef;
  constructor(private http: HttpClient) {
    // this.columnDefs = [
    //   {
    //     headerName: "Country",
    //     field: "country",
    //     width: 120,
    //     // rowGroup: true,
    //     hide: true,
    //     pinned: 'left',
    //     lockPinned: true,
    //     // cellClass: 'lock-pinned',
    //   },
    this.columnDefs = [
      {
        field: 'countrynumber',
        rowGroup: true,
        hide: true,
        // cellRenderer: "group",
        // cellRendererParams: {
        //   innerRenderer: this.innerCellRenderer
        // }
      },
      {
        field: 'countryname',
        // rowGroup: true,
        // hide: true,

      },
      {
        field: 'statenumber',
        rowGroup: true,
        hide: true,
      },
      {
        field: 'statename',

      },
      {
        field: 'statetype',
        // rowGroup: true,
        //   hide: true

      },

      {
        field: 'date',

      },
      {
        field: 'count',

      },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
    };
    this.autoGroupColumnDef = {
      // headerName: 'Country Number',
      // field: 'countrynumber',
      minWidth: 200,
    };
  }
  innerCellRenderer(params) {
    return params.value;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let rowDta: any = [];

    this.http
      .get('../assets/data.json')

      .subscribe((data: any) => {
        data.countries.map((element, i) => {
          element.states.forEach((el, index) => {
            el['countrynumber'] = element.countrynumber;
            el['countryname'] = element.countryname
            el.votes.forEach(item => {
              item["statenumber"] = el["statenumber"];
              item["statename"] = el["statename"];
              item["statetype"] = el["statetype"];
              item['countrynumber'] = el['countrynumber']
              item['countryname'] = el['countryname']

              rowDta.push(item)
            })
          });
        });
        this.rowData = rowDta
      });
  }
}
