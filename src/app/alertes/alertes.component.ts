import { NotificationService } from './../services/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-alertes',
  templateUrl: './alertes.component.html',
  styleUrls: ['./alertes.component.scss']
})
export class AlertesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titre', 'date', 'texte', 'criticite'];
  alertes: Alerte[];

  dataSource = new MatTableDataSource<Alerte>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ser: NotificationService) { }

  ngOnInit(): void {
    this.ser.getAlertes().subscribe((result: any)=>{
      this.alertes = result.data;
      this.alertes.forEach((alerte, index) => {
        alerte.timestamp = moment(result.data[index].timestamp);
      });
      this.dataSource.data = this.alertes;
      this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}

export interface Alerte{
  id: string,
  id_user: string,
  title: string,
  body: string,
  timestamp: moment.Moment,
  gravity: number,
  lu: boolean,
  vu: boolean
}