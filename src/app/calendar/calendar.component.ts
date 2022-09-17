import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/services/user.service';
import { Intervention } from './../interventions/interventions.component';
import { InterventionService } from './../services/intervention.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { Component, OnInit } from '@angular/core';
import frLocale from '@fullcalendar/core/locales/fr';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
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
  constructor(private ser: InterventionService) { }

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
      // if (result.site == "") {
      //   this.group.get('site').markAsTouched();
      //   this.ser.getInterventions().subscribe((result: any) => {
      //     this.calendarEvents = [];
      //     result.data.forEach((element: Intervention) => {
      //       this.calendarEvents.push({
      //         title: element.nom,
      //         start: element.heure_debut,
      //         end: element.heure_fin
      //       })
      //     });
      //     this.calendarOptions = {
      //       initialView: 'dayGridMonth',
      //       locale: 'fr',
      //       locales: [frLocale],
      //       headerToolbar: {
      //         left: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
      //         center: 'title'
      //       },
      //       customButtons: {
      //         custom1: {
      //           text: "Filtrer",
      //           click: () => {
      //             this.show = !this.show;
      //           }
      //         }
      //       },
      //       dayMaxEvents: true,
      //       events: this.calendarEvents,
      //     };
      //   });
      // }
      
        let site = (this.group.get('site').value == "") ? "n" : this.group.get('site').value;
        let technicien = (this.group.get('technicien').value == "") ? "n" : this.group.get('technicien').value;
        let etat = (this.group.get('etat').value == "") ? "n" : this.group.get('etat').value;
        let type = (this.group.get('type').value == "") ? "n" : this.group.get('type').value;
        this.ser.getInterventionID(site, technicien, etat, type).subscribe((result: any) => {
          this.calendarEvents = [];
          result.data.forEach((element: Intervention) => {
            if(element.etat =="Programmée")
            {
              this.calendarEvents.push({
              title: element.nom,
              start: element.heure_debut,
              end: element.heure_fin,
              backgroundColor: '#f6c23e'
             });
            }
            if(element.etat =="Terminée")
            {
              this.calendarEvents.push({
              title: element.nom,
              start: element.heure_debut,
              end: element.heure_fin,
              backgroundColor: '#378006'
             });
            }
            
            if(element.etat =="En Cours")
            {
              this.calendarEvents.push({
              title: element.nom,
              start: element.heure_debut,
              end: element.heure_fin,
              backgroundColor: '#1cc88a'
             });
            }
          });
          this.calendarOptions = {
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
            },
            dayMaxEvents: true,
            events: this.calendarEvents,
          };
        });
    });

    this.ser.getInterventions().subscribe((result: any) => {
      this.calendarEvents = [];
      result.data.forEach((element: Intervention) => {
        if(element.etat =="Programmée")
        {
          this.calendarEvents.push({
          title: element.nom,
          start: element.heure_debut,
          end: element.heure_fin,
          backgroundColor: '#f6c23e'
         });
        }
        if(element.etat =="Terminée")
        {
          this.calendarEvents.push({
          title: element.nom,
          start: element.heure_debut,
          end: element.heure_fin,
          backgroundColor: '#378006'
         });
        }
        
        if(element.etat =="En Cours")
        {
          this.calendarEvents.push({
          title: element.nom,
          start: element.heure_debut,
          end: element.heure_fin,
          backgroundColor: '#1cc88a'
         });
        }
      });
      this.calendarOptions = {
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
        },
        dayMaxEvents: true,
        events: this.calendarEvents,
      }
    });
  }
  onClick() {
    this.show = !this.show;
  }
}
