import { UUID } from 'angular2-uuid';
import { RegleService } from './../../services/regle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPlus, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Action, AjActionComponent } from './aj-action/aj-action.component';
import { AjConditionComponent, Condition } from './aj-condition/aj-condition.component';
import { Regle } from '../regles.component';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {

  plus_sign = faPlus;
  delete = faTrash;
  edit= faPencilAlt;
  group = new FormGroup({
    nom: new FormControl('',Validators.required),
    site: new FormControl('',Validators.required)
  });
  conditions: Condition[] = [];
  actions: Action[]=[];
  sites: {id: string, name: string}[] = [];
  constructor(public dialog: MatDialog, private ser: RegleService, @Inject(MAT_DIALOG_DATA) private data: Regle) { }

  ngOnInit(): void {
    this.ser.getSite().subscribe((result: {id: string, name: string}[])  => {
      this.sites = result;
      if(this.data == undefined || this.data == null)
      return;
      this.group.get('site').setValue(this.data.id_site);
    });
    if(this.data != undefined && this.data != null){
      this.group.get('nom').setValue(this.data.nom_regle);
      this.conditions = this.data.conditions;
      this.actions = this.data.actions;
    }
  }

  openAction(){
    const dialogRef = this.dialog.open(AjActionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined || result == null) return;
      this.actions.push(result);
    });
  }
  openCondition(){
    if(this.group.get('site').invalid){ 
      this.group.get('site').markAsTouched();
      return;
    }
    const dialogRef = this.dialog.open(AjConditionComponent, { data: {site: this.group.value.site, object: null}});

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined || result == null) return;
      this.conditions.push(result);
    });
  }
  modifierCondition(condition){
    if(this.group.get('site').invalid){
      return;
    }
    const dialogRef = this.dialog.open(AjConditionComponent, { data: {site: this.group.value.site, object: condition}});
    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined || result == null) return;
      let index = Array.from(this.conditions).findIndex((result) => {
        if(condition == result)
        return true;
      });
      if(index != -1){
        this.conditions[index]=result;
      }
    });
  }
  modifierAction(action){
    const dialogRef = this.dialog.open(AjActionComponent, { data: action});
    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined || result == null) return;
      let index = this.actions.findIndex((result) => {
        if(action == result)
        return true;
      });
      if(index != -1){
        this.actions[index]=result;
      }
    });
  }
  onClickDeleteCondition(condition: Condition){
    this.conditions.forEach((value,index)=>{
      if(value==condition) this.conditions.splice(index,1);
  });
  }
  onClickDeleteAction(action: Action){
    this.actions.forEach((value,index)=>{
      if(value==action) this.actions.splice(index,1);
  });
  }
  sendData(){
    let site = this.sites.find(result => {
      if (result.id === this.group.get('site').value)
      return true;
    });
    let regle = {
      nom_regle: this.group.value.nom,
      id_site: this.group.value.site,
      nom_site: site.name,
      conditions: this.conditions,
      actions: this.actions,
      active: true,
      id_capteur: [],
      etat: false,
      lastactive: new Date()
    }
    if(this.data==undefined||this.data==null){
      this.ser.addRegle(regle);
    }
    else{
      this.ser.modifyRegle(this.data.id,regle);
    }
  }
}
