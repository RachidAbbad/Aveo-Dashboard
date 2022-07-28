import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AjOutilsComponent } from './aj-outils/aj-outils.component';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPlus, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { AjMaterielComponent } from './aj-materiel/aj-materiel.component';
import { MatTableDataSource } from '@angular/material/table';
import { AjActionsComponent } from './aj-actions/aj-actions.component';
import { ModeOp } from '../ajouter-int.component';

@Component({
  selector: 'app-mode-op',
  templateUrl: './mode-op.component.html',
  styleUrls: ['./mode-op.component.scss']
})
export class ModeOpComponent implements OnInit {
  plus_sign = faPlus;
  delete = faTrash;
  edit = faPencilAlt;
  displayedColumns: string[] = ['equipement', 'action', 'actions'];
  mode_op: equipementAction[] =[];
  dataSource = new MatTableDataSource<equipementAction>(this.mode_op);
  group = new FormGroup({
    zone: new FormControl('', Validators.required)
  });
  zones = ["Foyer" , "Echangeur circuit (Gaz/Fumée)" , "Ventilateurs" , "Système de Ramonage" , "Vis Sans fin" , "Silo" , "Pompes" , "Ciruits Hydraulique" , "Elements de contrôle et de régulation"]
  filteredZones: Observable<string[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data) { }

  
  ngOnInit(): void {
    if(this.data != undefined || this.data != null) {
      this.group.get("zone").setValue(this.data.zone);
      this.mode_op = this.data.actions;
      this.dataSource.data = this.mode_op;
    }
    this.filteredZones = this.group.get('zone').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value),
        map(name => name ? this._filter(name) : this.zones.slice())
      );
  }
  openDialog(){
    let dialogRef = this.dialog.open(AjActionsComponent, {data: null});
    dialogRef.afterClosed().subscribe((result: equipementAction)=>{
    if (result === undefined) return;
    this.mode_op.push(result);
    this.dataSource.data = this.mode_op;
    });
  }
  private _filter(zone: string): string[] {
    const filterValue = zone.toLowerCase();

    return this.zones.filter(option => option.toLowerCase().includes(filterValue));
  }
  openModifyDialogue(row: equipementAction){
    let dialogRef = this.dialog.open(AjActionsComponent, {data: row});
    dialogRef.afterClosed().subscribe((result: equipementAction)=>{
      if (result === undefined) return;
      const index = this.mode_op.indexOf(row);
      if (index >= 0) {
        this.mode_op.splice(index, 1,result);
        this.dataSource.data = this.mode_op;
      }
      });
  }
  deleteEquipement(row: equipementAction){
    const index = this.mode_op.indexOf(row);
    if (index >= 0) {
      this.mode_op.splice(index, 1);
      this.dataSource.data = this.mode_op;
    }
  }
  compareCategoryObjects(object1: string, object2: string) {
    return object1 && object2 && object1.trim() == object2.trim();
}
  sendData(){
    let mode_op: ModeOp = {
      actions: this.mode_op,
      zone: this.group.value.zone,
      id_tache: UUID.UUID()
    }
    return mode_op;
  }
}
export interface equipementAction {
  id_action: string;
  nom_equipement: string;
  action: string[];
}
