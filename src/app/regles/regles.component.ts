import { RegleService } from './../services/regle.service';
import { AjouterComponent } from './ajouter/ajouter.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faFileDownload, faPlus, faTrash, faPencilAlt, faTable, faCalendar, faChevronRight, faSync } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-regles',
  templateUrl: './regles.component.html',
  styleUrls: ['./regles.component.scss']
})
export class ReglesComponent implements OnInit {

  table = faTrash;
  calendar = faCalendar;
  plus_sign = faPlus;
  delete = faTrash;
  edit = faPencilAlt;
  view = false;
  proceed = faChevronRight;
  sync = faSync;
  color: ThemePalette = 'primary';
  element_data: Regle[];
  refr : any;
  displayedColumns: string[] = ['nom', 'site', 'toggle', 'actions'];
  dataSource = new MatTableDataSource<Regle>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private ser: RegleService) {
    ser.getRegle().subscribe((result: any) => {
      this.element_data = result.data;
      this.dataSource.data = this.element_data;
    });
  }



  refresh(){
    this.ser.getRegle().subscribe((result: any) => {
      this.element_data = [];
      this.element_data = result.data;
      this.dataSource.data = this.element_data;
    });
  }
  ngOnInit(): void {
    this.refr = setInterval(()=>{
      this.ser.getRegle().subscribe((result: any) => {
        this.element_data = [];
        this.element_data = result.data;
        this.dataSource.data = this.element_data;
      });
    }, 10000);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialog() {
    const dialogRef = this.dialog.open(AjouterComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.ser.getRegle().subscribe((result: any) => {
        this.element_data = result.data;
        this.dataSource.data = this.element_data;
      });
    });
  }
  ngOnDestroy()
  {
    clearInterval(this.refr);
  }
  switch(element: any) {
    this.ser.switchActive(element.id, element.active);
  }
  deleteRegle(element: any) {
    let d = confirm("êtes-vous sûr de procéder à cette opération ?");
    if (d) {
      this.ser.deleteRegle(element.id);
      setTimeout(() => {
        this.ser.getRegle().subscribe((result: any) => {
          this.element_data = result.data;
          this.dataSource.data = this.element_data;
        });
      }, 400);
    }
  }
  elementState(event) {
  }
  modifyRegle(row) {
    const dialogRef = this.dialog.open(AjouterComponent, { data: row });
    setTimeout(() => {
      this.ser.getRegle().subscribe((result: any) => {
        this.element_data = result.data;
        this.dataSource.data = this.element_data;
      });
    }, 400);
  }
}

export interface Regle {
  id: string;
  nom_regle: string;
  id_site: string;
  active: boolean;
  nom_site: string;
  actions: {
    id_action: string;
    title: string;
    criticite: number;
    content: string;
    type: string;
    id_recepteurs: string[];
  }[];
  conditions: {
    id_condition: string;
    id_capteur: string;
    parameter_name: string;
    type: string;
    type_condition: string;
    type_seuil: string;
    nom_jour: string;
    value: number;
  }[];
  id_capteur: string[],
  etat: any,
  lastactive: any
}
