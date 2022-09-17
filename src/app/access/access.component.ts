import { element } from 'protractor';
import { AccessService } from './../services/access.service';
import { ListAccessComponent } from './../list-access/list-access.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { I } from '@angular/cdk/keycodes';

interface Access {
  utilisateurs: {
    id: string,
    name: string,
    sites_autorises: {
      name: string,
      Id_site: string
    }[]
  }[]
  sites: {
    name: string,
    Id_site: string
  }[]
}

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
  providers: [AccessService]
})
export class AccessComponent implements OnInit {
  selectedId;
  selectedObj : any;
  modify = faPencilAlt;
  delete = faTrash;
  add = faPlus;
  data : Access;
  arr_add;
  users : Utilisateur[];
  selectedOption: Utilisateur;
  constructor(private dialog: MatDialog, private ser: AccessService) { 
    ser.GetInfo().subscribe((result: any) => {
      this.data = result.data;
      this.arr_add= this.data.sites;
      this.users = this.data.utilisateurs;
    })
  }

  
  ngOnInit(): void {
    
  }
  onNameClick(user, index){
    this.selectedId = index;
    this.selectedObj = user;
  }
  isUndefined(ev){
    return !(typeof ev === "undefined");
  }
  onClickDeletePermission(perm, user){
    let d = confirm("êtes-vous sûr de procéder à cette opération ?");
    if(d){
    let id=user.sites_autorises.indexOf(perm);
    user.sites_autorises.splice(id,1);
    this.ser.modifyUser(user.id, user.sites_autorises).subscribe(); 
  }
  }
  onClickDeleteUser(user){
    let d = confirm("êtes-vous sûr de procéder à cette opération ?");
    if(d){
    let id=this.users.indexOf(user);
    this.users.splice(id,1);
  }
  }
  openDialog(selectedId){
    let dialogRef = this.dialog.open(ListAccessComponent, {data: this.arr_add});
    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined || result == null) return;
      result.forEach(element => 
      {
        var test =false;
        console.log("site name "+ element.name);
        this.users[selectedId].sites_autorises.forEach(site =>
        {
          console.log("elem  id "+ element.name+ "site id "+ site.name);
          if(element.name==site.name)
          {
            test = true;
          }
        });
         if(!test)
         {
          this.users[selectedId].sites_autorises.push(element);
         }
      });
      //this.users[selectedId].sites_autorises = this.users[selectedId].sites_autorises.concat(result);
      this.ser.modifyUser(this.selectedObj.id, this.users[selectedId].sites_autorises).subscribe();
    })
  }
}

export interface Utilisateur {
    id: string;
    name: string;
    sites_autorises: {
      name: string;
      Id_site: string;
      }[];
}