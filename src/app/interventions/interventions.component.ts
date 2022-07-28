import { element } from 'protractor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InterventionService } from './../services/intervention.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faFileDownload, faPlus, faTrash, faPencilAlt, faTable, faCalendar, faSync } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import frLocale from '@fullcalendar/core/locales/fr';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CalendarOptions } from '@fullcalendar/angular';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss']
})
export class InterventionsComponent implements OnInit, AfterViewInit {
  table = faTrash;
  calendar = faCalendar;
  plus_sign = faPlus;
  delete = faTrash;
  edit = faPencilAlt;
  sync = faSync;
  view = false;
  
  data: Intervention[]=[];
  dataSource = new MatTableDataSource<Intervention>(this.data);;
  displayedColumns: string[] = ['id', 'description', 'date', 'duree', 'responsable','etat','actions'];

  calendarEvents = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'fr',
    locales: [frLocale],
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
      center: 'title'
    },
    customButtons: {
      custom1: {
        text: "Filtrer",
        click: () => {
          this.show = !this.show;
        }
      }
    }
  };
  filter = faFilter;
  show = false;
  sites = [];
  techniciens = [];
  group = new FormGroup({
    site: new FormControl(''),
    technicien: new FormControl(''),
    etat: new FormControl(''),
    type: new FormControl('')
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ser: InterventionService, private router: Router) {
    
  }

  refr : any;
  refresh(){
    this.ser.getInterventions().subscribe((result: any) => {
      this.data = [];
      result.data.forEach(intervention => {
        this.data.push({id: intervention.id,
          date: moment(intervention.date),
          description: intervention.description,
          etat: intervention.etat,
          heure_debut: moment(intervention.heure_debut),
          heure_fin: moment(intervention.heure_fin),
          id_chaudiere: intervention.id_chaudiere,
          id_collaborateur: intervention.id_collaborateur,
          id_contremaitre_exploitation: intervention.id_contremaitre_exploitation,
          id_responsable: intervention.id_responsable,
          id_responsable_executif: intervention.id_responsable_executif,
          id_site: intervention.id_site,
          materiels: intervention.materiels,
          nom: intervention.nom,
          nom_contremaitre_exploitation: intervention.nom_contremaitre_exploitation,
          nom_responsable: intervention.nom_responsable,
          nom_responsable_executif: intervention.nom_responsable_executif,
          nom_site: intervention.nom_site,
          outils: intervention.outils,
          taches: intervention.taches,
          type: intervention.type,
          periode: intervention.periode})
      });;
      this.dataSource.data = this.data;
    });
  }
  showfiltre()
  {
    this.show = !this.show;
  }
  ngOnInit(): void {
    this.ser.getSite().subscribe((result: { id: string, name: string }[]) => {
      this.sites = result;
    });
    this.ser.getTechnicien().subscribe((result: any) => {
      result.data.forEach((element: User) => {
        if (element.type_user == 3)
          this.techniciens.push(element);
      });
    });
    this.group.valueChanges.subscribe((result) => {
      clearInterval(this.refr);
      this.data = [];
        let site = (this.group.get('site').value == "") ? "n" : this.group.get('site').value;
        let technicien = (this.group.get('technicien').value == "") ? "n" : this.group.get('technicien').value;
        let etat = (this.group.get('etat').value == "") ? "n" : this.group.get('etat').value;
        let type = (this.group.get('type').value == "") ? "n" : this.group.get('type').value;
        this.ser.getInterventionID(site, technicien, etat, type).subscribe((result: any) => {
          result.data.forEach(intervention => {
            this.data.push({id: intervention.id,
              date: moment(intervention.date),
              description: intervention.description,
              etat: intervention.etat,
              heure_debut: moment(intervention.heure_debut),
              heure_fin: moment(intervention.heure_fin),
              id_chaudiere: intervention.id_chaudiere,
              id_collaborateur: intervention.id_collaborateur,
              id_contremaitre_exploitation: intervention.id_contremaitre_exploitation,
              id_responsable: intervention.id_responsable,
              id_responsable_executif: intervention.id_responsable_executif,
              id_site: intervention.id_site,
              materiels: intervention.materiels,
              nom: intervention.nom,
              nom_contremaitre_exploitation: intervention.nom_contremaitre_exploitation,
              nom_responsable: intervention.nom_responsable,
              nom_responsable_executif: intervention.nom_responsable_executif,
              nom_site: intervention.nom_site,
              outils: intervention.outils,
              taches: intervention.taches,
              type: intervention.type,
              periode: intervention.periode})
          });
          this.dataSource.data = this.data;
          
        });
    });

    this.ser.getInterventions().subscribe((result: any) => {
      result.data.forEach(intervention => {
        this.data.push({id: intervention.id,
          date: moment(intervention.date),
          description: intervention.description,
          etat: intervention.etat,
          heure_debut: moment(intervention.heure_debut),
          heure_fin: moment(intervention.heure_fin),
          id_chaudiere: intervention.id_chaudiere,
          id_collaborateur: intervention.id_collaborateur,
          id_contremaitre_exploitation: intervention.id_contremaitre_exploitation,
          id_responsable: intervention.id_responsable,
          id_responsable_executif: intervention.id_responsable_executif,
          id_site: intervention.id_site,
          materiels: intervention.materiels,
          nom: intervention.nom,
          nom_contremaitre_exploitation: intervention.nom_contremaitre_exploitation,
          nom_responsable: intervention.nom_responsable,
          nom_responsable_executif: intervention.nom_responsable_executif,
          nom_site: intervention.nom_site,
          outils: intervention.outils,
          taches: intervention.taches,
          type: intervention.type,
          periode: intervention.periode})
      });
      this.dataSource.data = this.data;
    });
    this.refr = setInterval(()=>{
      this.data = [];
      this.ser.getInterventions().subscribe((result: any) => {
        result.data.forEach(intervention => {
          this.data.push({id: intervention.id,
            date: moment(intervention.date),
            description: intervention.description,
            etat: intervention.etat,
            heure_debut: moment(intervention.heure_debut),
            heure_fin: moment(intervention.heure_fin),
            id_chaudiere: intervention.id_chaudiere,
            id_collaborateur: intervention.id_collaborateur,
            id_contremaitre_exploitation: intervention.id_contremaitre_exploitation,
            id_responsable: intervention.id_responsable,
            id_responsable_executif: intervention.id_responsable_executif,
            id_site: intervention.id_site,
            materiels: intervention.materiels,
            nom: intervention.nom,
            nom_contremaitre_exploitation: intervention.nom_contremaitre_exploitation,
            nom_responsable: intervention.nom_responsable,
            nom_responsable_executif: intervention.nom_responsable_executif,
            nom_site: intervention.nom_site,
            outils: intervention.outils,
            taches: intervention.taches,
            type: intervention.type,
            periode: intervention.periode})
        });
        this.dataSource.data = this.data;
      });
    }, 10000);
    moment.locale('fr');
  }
  ngAfterViewInit(){
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Modifier(element){
    this.ser.setIntervention(element);
    this.ser.modifyInterventionetat(element.id,{etat:"En Modification" });
    this.router.navigate(['/home/ajouterIntervention']);
  }
  Delete(element){
    let d = confirm("êtes-vous sûr de procéder à cette opération ?");
    if(d){
      this.ser.deleteIntervention(element.id);
      setTimeout(() => { this.ser.getInterventions().subscribe((result: any) => {
        this.data = [];
        result.data.forEach(intervention => {
          this.data.push({id: intervention.id,
            date: moment(intervention.date),
            description: intervention.description,
            etat: intervention.etat,
            heure_debut: moment(intervention.heure_debut),
            heure_fin: moment(intervention.heure_fin),
            id_chaudiere: intervention.id_chaudiere,
            id_collaborateur: intervention.id_collaborateur,
            id_contremaitre_exploitation: intervention.id_contremaitre_exploitation,
            id_responsable: intervention.id_responsable,
            id_responsable_executif: intervention.id_responsable_executif,
            id_site: intervention.id_site,
            materiels: intervention.materiels,
            nom: intervention.nom,
            nom_contremaitre_exploitation: intervention.nom_contremaitre_exploitation,
            nom_responsable: intervention.nom_responsable,
            nom_responsable_executif: intervention.nom_responsable_executif,
            nom_site: intervention.nom_site,
            outils: intervention.outils,
            taches: intervention.taches,
            type: intervention.type,
            periode: intervention.periode})
        });;
        this.dataSource.data = this.data;
      });
    },400);
    }
    else
    return;
  }
  ngOnDestroy()
  {
    clearInterval(this.refr);
  }
  returnEtat(element:Intervention){
    
    return element.etat;
  }
  returnetatClass(element: Intervention){
    if(element.etat == "Terminée"){
      return "text-success";
    }
    else{
      if(element.etat == "En Cours"){
        return "text-info";
      }
      else{
        return "text-warning";
      }
    }
  }
}


export interface Intervention {
  id: string;
  nom: string;
  description: string;
  type: string;
  date: moment.Moment;
  heure_debut: moment.Moment;
  heure_fin: moment.Moment;
  periode?: number;
  id_site: string;
  nom_site: string;
  nom_responsable: string;
  nom_responsable_executif: string;
  nom_contremaitre_exploitation: string;
  id_chaudiere: string;
  id_collaborateur: [string];
  id_responsable: string;
  id_responsable_executif: string;
  id_contremaitre_exploitation: string;
  etat: string;
  taches: {id_tache: string, zone: string, actions: {id_action: string, nom_equipement: string, action: string[]}[]}[];
  outils: string[];
  materiels: string[];
}

const ELEMENT_DATA: Intervention[] = [];

/*this.displayData.push({
        id: intervention.id,
        date: intervention.date.toISOString().split('T')[0],
        description: intervention.description,
        etat: intervention.etat,
        heure_debut: intervention.heure_debut,
        heure_fin: intervention.heure_fin,
        id_chaudiere: intervention.id_chaudiere,
        id_collaborateur: intervention.id_collaborateur,
        id_contremaitre_exploitation: intervention.id_contremaitre_exploitation,
        id_responsable: intervention.id_responsable,
        id_responsable_executif: intervention.id_responsable_executif,
        id_site: intervention.id_site,
        materiels: intervention.materiels,
        nom: intervention.nom,
        nom_contremaitre_exploitation: intervention.nom_contremaitre_exploitation,
        nom_responsable: intervention.nom_responsable,
        nom_responsable_executif: intervention.nom_responsable_executif,
        nom_site: intervention.nom_site,
        outils: intervention.outils,
        taches: intervention.taches,
        type: intervention.type,
        periode: intervention.periode
      });*/