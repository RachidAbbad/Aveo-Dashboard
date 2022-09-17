import { MatSelectionListChange } from '@angular/material/list';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';
import { Intervention } from './../interventions.component';
import { InterventionService } from './../../services/intervention.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AjOutilsComponent } from './mode-op/aj-outils/aj-outils.component';
import { equipementAction, ModeOpComponent } from './mode-op/mode-op.component';

import frLocale from "@fullcalendar/core/locales/fr";
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faDownload, faPlus, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AjMaterielComponent } from './mode-op/aj-materiel/aj-materiel.component';
import { User } from 'src/app/services/user.service';
import { EventClickArg } from '@fullcalendar/common';
import * as moment from 'moment';
import { element } from 'protractor';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'ajouter-int',
  templateUrl: './ajouter-int.component.html',
  styleUrls: ['./ajouter-int.component.scss']
})

export class AjouterIntComponent implements OnInit {

  details = new FormGroup({
    type: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    periode: new FormControl(1,Validators.required),
    nom: new FormControl('', Validators.required),
    heure_debut: new FormControl('', Validators.required),
    heure_fin: new FormControl('', Validators.required),
    site: new FormControl('', Validators.required),
    description: new FormControl(''),
    executif: new FormControl('', Validators.required),
    contremaitre: new FormControl('', Validators.required)
  });
  first : boolean = false;
  private user = JSON.parse(localStorage.getItem('user'));
  inter: Intervention;
  outils: string[] = [];
  materiels: string[] = [];
  mode_ops: ModeOp[] = [];
  techniciens: User[] = [];
  sites: { id: string, name: string }[] = [];
  responsables: User[] = [];
  plus_sign = faPlus;
  edit = faPencilAlt;
  download = faDownload;
  delete = faTrash;
  Type: string;
  calendarEvents = [];
  value_techniciens: string[] = [];
  tech_group = new FormControl('', Validators.required);
  technicienArr = new Array(3);
  selected_event: EventClickArg;
  add_1: moment.Moment;
  add_2: moment.Moment;
  end_1: moment.Moment;
  end_2: moment.Moment;
  periode: number;
  start_time : moment.Moment;
  end_time: moment.Moment;
  back_start :any;
  back_end :any;


  @ViewChild('calendar') calendar: FullCalendarComponent;

  constructor(public dialog: MatDialog, private router: Router, private ser: InterventionService) {
    this.inter = this.ser.getIntervention;
  }
ngOnDestroy()
{
  if(this.inter!= undefined ||this.inter!= null)
  this.ser.modifyInterventionetat(this.inter.id,{etat:this.inter.etat});
}
  ngOnInit() {
    this.technicienArr = [[],[],[]];
    this.ser.getSite().subscribe((result: { id: string; name: string; }[]) => {
      this.sites = result;
      if (this.inter == undefined || this.inter == null)
        return;
      this.details.get('site').setValue(this.inter.id_site);
    });
    this.ser.getResponsable().subscribe((result: any) => {
      this.responsables = result.data;
      if (this.inter == undefined || this.inter == null)
        return;
      this.details.get('executif').setValue(this.inter.id_responsable_executif);
      this.details.get('contremaitre').setValue(this.inter.id_contremaitre_exploitation);
    });
    if (this.inter == undefined || this.inter == null)
      return;
    else {
      this.details.setValue({
        type: this.inter.type.toLowerCase(),
        periode: this.inter.periode,
        nom: this.inter.nom,
        date: moment(this.inter.date).toDate(),
        heure_debut: moment(this.inter.heure_debut).format("HH:mm"),
        heure_fin: moment(this.inter.heure_fin).format("HH:mm"),
        site: this.inter.nom_site,
        description: this.inter.description,
        executif: this.inter.id_responsable_executif,
        contremaitre: this.inter.nom_contremaitre_exploitation
      });
      this.inter.outils.forEach(outil => {
        this.outils.push(outil);
      });
      this.inter.materiels.forEach(materiel => {
        this.materiels.push(materiel);
      });
      this.inter.taches.forEach(tache => {
        let actions: { id_action: string, nom_equipement: string, action: string[] }[] = [];
        tache.actions.forEach(action => {
          actions.push({
            id_action: action.id_action,
            action: action.action,
            nom_equipement: action.nom_equipement,
          })
        });
        this.mode_ops.push({ id_tache: UUID.UUID(), zone: tache.zone, actions: actions });
      })
    }
  }
  calendarOptions: CalendarOptions = {
    timeZone: 'Africa/Casablanca',
    initialView: 'timeGridWeek',
    initialDate: moment().toDate(),
    locale: 'fr',
    locales: [frLocale],
    headerToolbar: {
      center: 'title',
      left: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    eventResizableFromStart: true,
    dayMaxEvents: true,
    events: this.calendarEvents,
    
  };

  openCondition() {
    let dialogRef = this.dialog.open(ModeOpComponent);
    dialogRef.afterClosed().subscribe((result: ModeOp) => {
      if (result === undefined || result == null) return;
      this.mode_ops.push(result);
    })
  }
  openOutils() {
    let dialogRef = this.dialog.open(AjOutilsComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) return;
      this.outils.push(result);
    });

  }
  openMateriel() {
    let dialogRef = this.dialog.open(AjMaterielComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) return;
      this.materiels.push(result);
    });
  }
  Submit() 
  {
    if(this.calendarEvents != null){
      this.calendarEvents = [];
      this.technicienArr = [[],[],[]];
      this.inter = null;
      this.calendarOptions = null;
      this.value_techniciens = [];
    }
    let type = this.details.get('type').value;
    if(type == "correctif"|| type == "preventif")
    {
      this.first = true;
      if (this.details.invalid)
       return;
      let date: moment.Moment = moment(this.details.get('date').value);
    try 
    {
      date.hours(12);
    this.details.get('date').setValue(date.toJSON());

    } catch 
    {

    }
    let to_moment = moment(date).add(30, 'days');
    let from_moment = moment(date).subtract(30, 'days');
    let heure_debut: string = this.details.get('heure_debut').value;
    let heure_fin: string = this.details.get('heure_fin').value;


    date.hour(+heure_debut.split(':')[0]).utc(true);
    date.minute(+heure_debut.split(':')[1]);
    this.details.get('heure_debut').setValue(date.toJSON());
    date.hour(+heure_fin.split(':')[0]).utc(true);
    date.minute(+heure_fin.split(':')[1]);
    this.details.get('heure_fin').setValue(date.toJSON());
    let id_site = this.details.get('site').value;

    let fin_date = this.details.get('heure_fin').value;
    let debut_date = this.details.get('heure_debut').value;

    this.ser.getInterventionInterval(id_site,from_moment.toJSON(), to_moment.toJSON()).subscribe((result: any) => {
      let start_date = moment(this.details.get('heure_debut').value);
      let end_date = moment(this.details.get('heure_fin').value);
      let periode = parseInt(this.details.get('periode').value);
      let type = this.details.get('type').value;
      this.periode = periode;
      let api = this.calendar.getApi();
      this.calendarEvents = [];
      result.data.forEach((element: Intervention) => {
        var heurd = new Date(element.heure_debut.toString());
        var heurf = new Date(element.heure_fin.toString());
        this.calendarEvents.push({
          title: element.nom,
          start:heurd.setHours(heurd.getHours()+1),
          end: heurf.setHours(heurf.getHours()+1),
          backgroundColor: "#808080",
          borderColor: "#808080",
          editable: false
        });
      });
      if (this.inter == undefined || this.inter == null) {
        if (type == "correctif"||periode==0) {
          this.calendarEvents.push({
            title: this.details.get('nom').value,
            start: start_date.toJSON(),
            end: end_date.toJSON(),
            allDay: false
          });
          
              this.back_start = start_date.toJSON();
              this.back_end = end_date.toJSON();
          this.calendarOptions = {
            timeZone: 'Africa/Casablanca',
            initialView: 'timeGridWeek',
            initialDate: start_date.toDate(),
            locale: 'fr',
            locales: [frLocale],
            headerToolbar: {
      center: 'title',
              left: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            eventResizableFromStart: true,
            dayMaxEvents: true,
            events: this.calendarEvents,
            eventResize: (info) => {
              this.details.get('heure_debut').setValue(moment(info.event.start).add(-1, 'hours').format("HH:mm"));
              this.start_time = moment(info.event.start);
              this.details.get('heure_fin').setValue(moment(info.event.end).add(-1, 'hours').format("HH:mm"));
              this.end_time = moment(info.event.end);
              this.techniciens = [];
              this.ser.getTechnicianAvailable(id_site, info.event.start.toJSON(), info.event.end.toJSON()).subscribe((result: any) => {
                this.techniciens = result.data;
              });
            },
            eventDrop: (info) => {
              this.details.get('date').setValue(info.event.start);
              this.details.get('heure_debut').setValue(moment(info.event.start).add(-1, 'hours').format("HH:mm"));
              this.start_time = moment(info.event.start);
              this.details.get('heure_fin').setValue(moment(info.event.end).add(-1, 'hours').format("HH:mm"));
              this.end_time = moment(info.event.end);
              this.techniciens = [];
              this.ser.getTechnicianAvailable(id_site, info.event.start.toJSON(), info.event.end.toJSON()).subscribe((result: any) => {
                this.techniciens = result.data;
              });
            }
          };
          api.gotoDate(start_date.toDate());
        }
        else {
          this.calendarEvents.push({
            id: 0,
            title: this.details.get('nom').value,
            start: start_date.toJSON(),
            end: end_date.toJSON(),
            backgroundColor: "#91f291",
            borderColor: "#91f291"
          });
          api.gotoDate(start_date.toDate());
              this.back_start = start_date.toJSON();
              this.back_end = end_date.toJSON();
          this.calendarEvents.push({
            id: 1,
            title: this.details.get('nom').value,
            start: start_date.add(periode, 'days').toJSON(),
            end: end_date.add(periode, "days").toJSON(),
            backgroundColor: "#91f291",
            borderColor: "#91f291"
          });
          
          this.calendarEvents.push({
            id: 2,
            title: this.details.get('nom').value,
            start: start_date.add(periode, 'days').toJSON(),
            end: end_date.add(periode, 'days').toJSON(),
            backgroundColor: "#91f291",
            borderColor: "#91f291"
          });
          
          this.add_2 = moment(this.calendarEvents.find(element => {
            if (element.id == 2)
              return true;
          }).start);
          this.add_1 = moment(this.calendarEvents.find(element => {
            if (element.id == 1)
              return true;
          }).start);
          this.end_2 = moment(this.calendarEvents.find(element => {
            if (element.id == 2)
              return true;
          }).end);
          this.end_1 = moment(this.calendarEvents.find(element => {
            if (element.id == 1)
              return true;
          }).end);

          this.calendarOptions = {
            timeZone: 'Africa/Casablanca',
            initialView: 'dayGridMonth',
            locale: 'fr',
            locales: [frLocale],
            headerToolbar: {
      center: 'title',
              left: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            eventResizableFromStart: true,
            dayMaxEvents: true,
            events: this.calendarEvents,
            eventResize: (info) => {
              if (info.event.id == '0') {
                this.details.get('heure_debut').setValue(moment(info.event.start).add(-1, 'hours').format("HH:mm"));
              this.start_time = moment(info.event.start);
              this.details.get('heure_fin').setValue(moment(info.event.end).add(-1, 'hours').format("HH:mm"));
              this.end_time = moment(info.event.end);
              }
              if (info.event.id == '1') {
                this.add_1 = moment(info.event.start);
                this.end_1 = moment(info.event.end);
              }
              if (info.event.id == '2') {
                this.add_2 = moment(info.event.start);
                this.end_2 = moment(info.event.end);
              }
              this.techniciens = [];
              this.ser.getTechnicianAvailable(id_site, info.event.start.toJSON(), info.event.end.toJSON()).subscribe((result: any) => {
                this.techniciens = result.data;
              });
            },
            eventDrop: (info) => {
              if (info.event.id == '0') {
                this.details.get('date').setValue(info.event.start.toJSON());
                this.details.get('heure_debut').setValue(moment(info.event.start).add(-1, 'hours').format("HH:mm"));
              this.start_time = moment(info.event.start);
              this.details.get('heure_fin').setValue(moment(info.event.end).add(-1, 'hours').format("HH:mm"));
              this.end_time = moment(info.event.end);
              }
              if (info.event.id == '1') {
                this.add_1 = moment(info.event.start);
                this.end_1 = moment(info.event.end);
              }
              if (info.event.id == '2') {
                this.add_2 = moment(info.event.start);
                this.end_2 = moment(info.event.end);
              }
              this.techniciens = [];
              this.ser.getTechnicianAvailable(id_site, info.event.start.toJSON(), info.event.end.toJSON()).subscribe((result: any) => {
                this.techniciens = result.data;
              });
            },
            eventClick: (info) => {
              this.selected_event = info;
              if (info.event.backgroundColor == "#3788d8" || info.event.backgroundColor == "#808080") { }
              else {
                let events = info.view.calendar.getEvents();
                events.forEach((event) => {
                  if (event.backgroundColor == "#3788d8") {
                    event.setProp('backgroundColor', '#91f291');
                    event.setProp('borderColor', '#91f291');
                  }
                });
                info.event.setProp('backgroundColor', '#3788d8');
                info.event.setProp('borderColor', '#3788d8');
                this.techniciens = [];
                this.ser.getTechnicianAvailable(id_site, info.event.startStr, info.event.endStr).subscribe((result: any) => {
                  this.techniciens = result.data;
                  if (info.event.id == '0') {
                    if(this.technicienArr[0] != [])
                    this.tech_group.setValue(this.technicienArr[0]);
                  }
                  if (info.event.id == '1') {
                    if(this.technicienArr[1] != [])
                    this.tech_group.setValue(this.technicienArr[1]);
                  }
                  if (info.event.id == '2') {
                    if(this.technicienArr[2] != [])
                    this.tech_group.setValue(this.technicienArr[2]);
                  }
                });
              }
            },
          };
          api.changeView('dayGridMonth');
          
        }
      }
      /*else if(this.inter!=undefined&&this.inter.type=="correctif")
      {
        this.calendarEvents.find(element => {
          console.log("id element " +element.id);
          if (element.id == 0)
            element.start = moment(this.details.get('heure_debut').value).toJSON();
            element.end = moment(this.details.get('heure_fin').value).toJSON();
        })
      }*/
      
      else {
          let index = this.calendarEvents.findIndex((event) => 
          {
            if (event == this.inter)
            {
              return true;
            }
              
          });
          this.calendarEvents.splice(index, 1);
          this.calendarEvents.push({
            title: this.details.get('nom').value,
            start: moment(this.details.get('heure_debut').value).toJSON(),
            end: moment(this.details.get('heure_fin').value).toJSON(),
            allDay: false
          });
          this.calendarOptions = {
            timeZone: 'Africa/Casablanca',
            initialView: 'timeGridWeek',
            initialDate: start_date.toDate(),
            locale: 'fr',
            locales: [frLocale],
            headerToolbar: {
      center: 'title',
              left: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            eventResizableFromStart: true,
            dayMaxEvents: true,
            events: this.calendarEvents,
            eventResize: (info) => {
              this.details.get('heure_debut').setValue(moment(info.event.start).add(-1, 'hours').format("HH:mm"));
              this.start_time = moment(info.event.start);
              this.details.get('heure_fin').setValue(moment(info.event.end).add(-1, 'hours').format("HH:mm"));
              this.end_time = moment(info.event.end);
              this.techniciens = [];
              this.ser.getTechnicianAvailable(id_site, info.event.start.toJSON(), info.event.end.toJSON()).subscribe((result: any) => {
                this.techniciens = result.data;
              });
            },
            eventDrop: (info) => {
              this.start_time = moment(info.event.start);
              this.end_time = moment(info.event.end);
              this.details.get('date').setValue(info.event.start);
              this.details.get('heure_debut').setValue(moment(info.event.start).add(-1, 'hours').format("HH:mm"));
              this.details.get('heure_fin').setValue(moment(info.event.end).add(-1, 'hours').format("HH:mm"));
              this.techniciens = [];
              this.ser.getTechnicianAvailable(id_site, info.event.start.toJSON(), info.event.end.toJSON()).subscribe((result: any) => {
                this.techniciens = result.data;
              });
            }
          };
          api.gotoDate(start_date.toDate());
      }


    });
    this.ser.getTechnicianAvailable(id_site, debut_date, fin_date).subscribe((result: any) => {
      this.techniciens = result.data;
      if(this.inter != undefined || this.inter != null){
        this.tech_group.setValue(this.inter.id_collaborateur);
      }
    });
  }
  }
  selectionChange(event: MatSelectionListChange){
    if(this.selected_event == undefined) 
    {
      this.technicienArr[0] = this.value_techniciens;
      return;
    }
    
    this.technicienArr[this.selected_event.event.id] = this.value_techniciens;
  }
  onClickDeleteOutil(outil) {
    this.outils.forEach((value, index) => {
      if (value == outil) this.outils.splice(index, 1);
    });
  }
  onClickDeleteMateriel(materiel: string) {
    this.materiels.forEach((value, index) => {
      if (value == materiel) this.materiels.splice(index, 1);
    });
  }
  onClickDeleteModeop(mode_op: ModeOp) {
    this.mode_ops.forEach((value, index) => {
      if (value.zone == mode_op.zone && value.actions == mode_op.actions) this.mode_ops.splice(index, 1);
    });
  }
  onClickModifyModeop(mode_op) {
    let dialogRef = this.dialog.open(ModeOpComponent, { data: mode_op });
    dialogRef.afterClosed().subscribe((result: ModeOp) => {
      if (result === undefined || result == null) return;
      let index = this.mode_ops.findIndex((temp) => {
        if (temp == mode_op)
          return true;
      });
      if (index != -1) {
        this.mode_ops[index] = result;
      }
    });
  }
  valider() {
    let executif = this.responsables.find(result => {
      if (result.id === this.details.get('executif').value)
        return true;
    });
    let contremaitre = this.responsables.find(result => {
      if (result.id === this.details.get('contremaitre').value)
        return true;
    });
    let site = this.sites.find(result => {
      if (result.id === this.details.get('site').value)
        return true;
    });
    let mode_op_sendable: ModeOp[] = [];
    this.mode_ops.forEach(mode_op => {
      mode_op_sendable.push({
        actions: mode_op.actions,
        zone: mode_op.zone,
        id_tache: UUID.UUID()
      })
    });
    let type = this.details.get('type').value;
    let periode = parseInt(this.details.get('periode').value);
    if (type == "correctif" || periode==0) {
      let zone = new Date().toISOString();
      zone = zone.slice(zone.length-4,zone.length);
      
      let date = moment(this.details.get('heure_debut').value);
      let start_date = moment(this.details.get('heure_debut').value).add(-1, 'hours');
      let end_date = moment(this.details.get('heure_fin').value).add(-1, 'hours');
      if (!start_date.isValid()) 
      {
          date = this.start_time;
          start_date = this.start_time.add(-1, 'hours');
          end_date = this.end_time.add(-1, 'hours');
      }
      let body = {
        nom: this.details.get('nom').value,
        description: this.details.get('description').value,
        date: date.format("YYYY-MM-DDTHH:mm:ss.")+zone,
        heure_debut: start_date.format("YYYY-MM-DDTHH:mm:ss.")+zone,
        heure_fin: end_date.format("YYYY-MM-DDTHH:mm:ss.")+zone,
        periode: parseInt(this.details.get('periode').value),
        id_site: site.id,
        nom_site: site.name,
        type: this.details.get('type').value,
        id_responsable: this.user.id,
        nom_responsable: this.user.name + ' ' + this.user.prenom,
        id_responsable_executif: this.details.get('executif').value,
        nom_responsable_executif: executif.name + ' ' + executif.prenom,
        id_contremaitre_exploitation: this.details.get('contremaitre').value,
        nom_contremaitre_exploitation: contremaitre.name + ' ' + contremaitre.prenom,
        etat: "Programmée",
        taches: mode_op_sendable,
        outils: this.outils,
        materiels: this.materiels,
        id_chaudiere: "",
        id_collaborateur: this.value_techniciens
      }
      if (this.inter == undefined || this.inter == null){
        this.ser.addIntervention(body).subscribe();
        setTimeout(()=>{
          this.router.navigate(['/home/interventions'])
        }, 500);
      }
      else {
        this.ser.modifyIntervention(this.inter.id, {
          id: this.inter.id,
          nom: this.details.get('nom').value,
          description: this.details.get('description').value,
          date: start_date.format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_debut: start_date.add(-1, 'hours').format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_fin: end_date.add(-1, 'hours').format("YYYY-MM-DDTHH:mm:ss.")+zone,
          periode: parseInt(this.details.get('periode').value),
          id_site: site.id,
          nom_site: site.name,
          type: this.details.get('type').value,
          id_responsable: this.user.id,
          nom_responsable: this.user.name + ' ' + this.user.prenom,
          id_responsable_executif: this.details.get('executif').value,
          nom_responsable_executif: executif.name + ' ' + executif.prenom,
          id_contremaitre_exploitation: this.details.get('contremaitre').value,
          nom_contremaitre_exploitation: contremaitre.name + ' ' + contremaitre.prenom,
          etat: "Programmée",
          taches: mode_op_sendable,
          outils: this.outils,
          materiels: this.materiels,
          id_chaudiere: "",
          id_collaborateur: this.value_techniciens
        });
        setTimeout(()=>{
          this.router.navigate(['/home/interventions']);
        }, 1000);
      }
    }
    else {
      if (this.inter == undefined || this.inter == null) {
        let zone = new Date().toISOString();
        zone = zone.slice(zone.length-4,zone.length);
        let date = moment(this.details.get('heure_debut').value);
        let start_date = moment(this.details.get('heure_debut').value).add(-1, 'hours');
        let end_date = moment(this.details.get('heure_fin').value).add(-1, 'hours');
        if (!start_date.isValid()) 
      {
        date = this.start_time;
          start_date = this.start_time.add(-1, 'hours');
          end_date = this.end_time.add(-1, 'hours');
      }
        let body_1 = {
          nom: this.details.get('nom').value,
          description: this.details.get('description').value,
          date: date.format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_debut: start_date.format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_fin: end_date.format("YYYY-MM-DDTHH:mm:ss.")+zone,
          periode:parseInt(this.details.get('periode').value),
          id_site: site.id,
          nom_site: site.name,
          type: this.details.get('type').value,
          id_responsable: this.user.id,
          nom_responsable: this.user.name + ' ' + this.user.prenom,
          id_responsable_executif: this.details.get('executif').value,
          nom_responsable_executif: executif.name + ' ' + executif.prenom,
          id_contremaitre_exploitation: this.details.get('contremaitre').value,
          nom_contremaitre_exploitation: contremaitre.name + ' ' + contremaitre.prenom,
          etat: "Programmée",
          taches: mode_op_sendable,
          outils: this.outils,
          materiels: this.materiels,
          id_chaudiere: "",
          id_collaborateur: this.technicienArr[0]
        };
        
        let body_2 = {
          nom: this.details.get('nom').value,
          description: this.details.get('description').value,
          date: this.add_1.format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_debut: this.add_1.add(-1,"hours").format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_fin: this.end_1.add(-1,"hours").format("YYYY-MM-DDTHH:mm:ss.")+zone,
          periode: parseInt(this.details.get('periode').value),
          id_site: site.id,
          nom_site: site.name,
          type: this.details.get('type').value,
          id_responsable: this.user.id,
          nom_responsable: this.user.name + ' ' + this.user.prenom,
          id_responsable_executif: this.details.get('executif').value,
          nom_responsable_executif: executif.name + ' ' + executif.prenom,
          id_contremaitre_exploitation: this.details.get('contremaitre').value,
          nom_contremaitre_exploitation: contremaitre.name + ' ' + contremaitre.prenom,
          etat: "Programmée",
          taches: mode_op_sendable,
          outils: this.outils,
          materiels: this.materiels,
          id_chaudiere: "",
          id_collaborateur: this.technicienArr[1]
        };
        let body_3 = {
          nom: this.details.get('nom').value,
          description: this.details.get('description').value,
          date:this.add_2.format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_debut: this.add_2.add(-1,"hours").format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_fin: this.end_2.add(-1,"hours").format("YYYY-MM-DDTHH:mm:ss.")+zone,
          periode: parseInt(this.details.get('periode').value),
          id_site: site.id,
          nom_site: site.name,
          type: this.details.get('type').value,
          id_responsable: this.user.id,
          nom_responsable: this.user.name + ' ' + this.user.prenom,
          id_responsable_executif: this.details.get('executif').value,
          nom_responsable_executif: executif.name + ' ' + executif.prenom,
          id_contremaitre_exploitation: this.details.get('contremaitre').value,
          nom_contremaitre_exploitation: contremaitre.name + ' ' + contremaitre.prenom,
          etat: "Programmée",
          taches: mode_op_sendable,
          outils: this.outils,
          materiels: this.materiels,
          id_chaudiere: "",
          id_collaborateur: this.technicienArr[2]
        };
        this.ser.addIntervention(body_1).subscribe();
        this.ser.addIntervention(body_2).subscribe();
        this.ser.addIntervention(body_3).subscribe(()=>{
          this.router.navigate(['/home/interventions']);
        });
      }
      else {
        let zone = new Date().toISOString();
        zone = zone.slice(zone.length-4,zone.length);
        let date = moment(this.details.get('heure_debut').value);
        let start_date = moment(this.details.get('heure_debut').value).add(-1, 'hours');
        let end_date = moment(this.details.get('heure_fin').value).add(-1, 'hours');
        if (!start_date.isValid()) 
        {

          date = this.start_time;
          start_date = this.start_time.add(-1, 'hours');
          end_date = this.end_time.add(-1, 'hours');
        }
        this.ser.modifyIntervention(this.inter.id, {
          id: this.inter.id,
          nom: this.details.get('nom').value,
          description: this.details.get('description').value,
          date: start_date.format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_debut: start_date.add(-1, 'hours').format("YYYY-MM-DDTHH:mm:ss.")+zone,
          heure_fin: end_date.add(-1, 'hours').format("YYYY-MM-DDTHH:mm:ss.")+zone,
          periode: parseInt(this.details.get('periode').value),
          id_site: site.id,
          nom_site: site.name,
          type: this.details.get('type').value,
          id_responsable: this.user.id,
          nom_responsable: this.user.name + ' ' + this.user.prenom,
          id_responsable_executif: this.details.get('executif').value,
          nom_responsable_executif: executif.name + ' ' + executif.prenom,
          id_contremaitre_exploitation: this.details.get('contremaitre').value,
          nom_contremaitre_exploitation: contremaitre.name + ' ' + contremaitre.prenom,
          etat: "Programmée",
          taches: mode_op_sendable,
          outils: this.outils,
          materiels: this.materiels,
          id_chaudiere: "",
          id_collaborateur: this.value_techniciens
        });
        setTimeout(()=>{
          this.router.navigate(['/home/interventions']);
        }, 1000);
      }
    }
    
  }
  suivant(){
    if(this.details.valid && this.mode_ops.length != 0){
      return false;
    }
    else
    return true;
  }
  disabled() {
    if(this.inter == undefined || this.inter == null){
      let type = this.details.get("type").value;
      if (type == "correctif") {
        return this.tech_group.invalid;
      }
      else {
        
        if (this.technicienArr[0].length != 0 && this.technicienArr[1].length != 0 && this.technicienArr[2].length != 0){
          return false;
        }
        else
          return true;
      }
    }
    else{
      return this.tech_group.invalid;
    }
  }
  goback()
  {
          if(this.start_time==undefined)
          {
            this.details.get('heure_debut').setValue(moment(this.details.get('heure_debut').value).add(-1,"hours").format("HH:mm"));   
            this.details.get('heure_fin').setValue(moment(this.details.get('heure_fin').value).add(-1,"hours").format("HH:mm"));
          }
          
  }
}

interface Materiel {
  nom: string;
  nombre: number;
}
interface Outil {
  nom: string;
}
export interface ModeOp {
  id_tache: string;
  zone: string;
  actions: {
    id_action: string;
    nom_equipement: string;
    action: string[];
  }[];
}
