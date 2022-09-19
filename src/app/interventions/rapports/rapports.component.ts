import { Router } from '@angular/router';
import { InterventionService } from './../../services/intervention.service';
import { ShowRapportComponent } from './show-rapport/show-rapport.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faFileDownload, faPlus, faTrash, faPencilAlt, faTable, faCalendar, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.scss']
})
export class RapportsComponent implements OnInit, AfterViewInit {

  plus_sign = faPlus;
  delete = faTrash;
  edit = faPencilAlt;
  view = false;
  proceed = faChevronRight;
  displayedColumns: string[] = ['nom intervention', 'date', 'intervenant', 'rapport', 'validation'];
  rapports;
  rapport = null;
  dataSource = new MatTableDataSource<Rapport[]>();
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private ser: InterventionService, private router: Router) { 

  }

  
  
  ngOnInit(): void {
    moment.locale("fr");
    /*this.ser.getRapports().subscribe((result: any)=>{
      this.rapports = result.data;
      this.rapports.forEach((rapport, index) => {
        rapport.date_rapport = moment(result.data[index].date_rapport);
        rapport.date_intervention = moment(result.data[index].date_intervention);
      });
      this.dataSource.data = this.rapports;
      setTimeout(()=> this.paginate(), 100);
    });*/
    // setInterval(()=>
    // {
    //   this.ser.getRapports().subscribe((result: any)=>{
    //     this.rapports = result.data;
    //     this.rapports.forEach((rapport, index) => {
    //       rapport.date_rapport = moment(result.data[index].date_rapport);
    //       rapport.date_intervention = moment(result.data[index].date_intervention);
    //     });
    //     this.dataSource.data = this.rapports;
    //     setTimeout(()=> this.paginate(), 100);
    //   });
    // },30000);
    this.rapports = [{
      id_intervention: "qq",
      nom_intervention: "Réparer le chauffage",
      date_rapport: moment(),
      etat: 60,
      etat_rapport: false,
      nom_responsable: "Yassine ES SAID",
      date_intervention: moment(),
      id_responsable: "eiejfe",
      id_contremaitre_exploitation: "rifjijf",
      id_site: "iewrjgfeig",
      commantaire_generale: {audio: [""], etat: true, id_commentaire: "fiejifje", image: ["https://cdn.hellowatt.fr/media/uploads/zinnia/2021/05/06/consommation-chaudiere-electrique-interieur-cable.jpg"], id_tache:"", text:["le chauffage a été réparé avec succès"],video:[]},
      commentaire_tache: [{
        text:["Nettoyage des fummées terminé"], audio:[], video:[], image:["https://www.systemed.fr/images/conseils/xrealiser-tubage-d-conduit-fumee-6293-p7-l528-h528-c.jpg.pagespeed.ic.Hkk36eRiDC.webp"], etat:true
      },
      {
        text:["La dépose de la buse de fummée du raccordement de conduit"], audio:[], video:[""], image:["https://keiflin-cheminees.com/wp-content/uploads/2019/03/conduit.jpg"]
      }],
      id_responsable_executif:"efiejf",
      nom_contremaitre_exploitation:"Ahmed Hamid",
      nom_responsable_executif: "Ahmed Hatim",
      nom_site: "Rez-de-chaussée"
    },
    {
      id_intervention: "qq",
      nom_intervention: "Maintenance de la chaudière",
      date_rapport: moment(),
      etat: 100,
      etat_rapport: true,
      nom_responsable: "Yassine ES SAID",
      date_intervention: moment(),
      id_responsable: "eiejfe",
      id_contremaitre_exploitation: "rifjijf",
      id_site: "iewrjgfeig",
      commantaire_generale: {audio: [], etat: true, id_commentaire: "fiejifje", image: [], id_tache:"", text:["La chaudière a été inspectée et je n'ai rien trouvé à signaler. Tous les tests ont été passés avec succès"],video:[]},
      commentaire_tache: [],
      id_responsable_executif:"efiejf",
      nom_contremaitre_exploitation:"Ahmed Hamid",
      nom_responsable_executif: "Ahmed Hatim",
      nom_site: "Rez-de-chaussée"
    },];
    this.dataSource.data = this.rapports;
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
 roundTo(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  }
  paginate(){
      this.dataSource.paginator = this.paginator;
      
  }

  clicked_row(row){
    this.rapport = row;
  }
  return(){
    this.rapport=null;
  }

}


export interface Rapport {
  id_intervention: string;
  nom_intervention: string;
  id_site: string;
  nom_site: string;
  date_rapport:	moment.Moment;
  date_intervention: moment.Moment;
  id_responsable: string;
  nom_responsable: string;
  id_responsable_executif: string;
  nom_responsable_executif: string;
  id_contremaitre_exploitation: string;
  nom_contremaitre_exploitation: string;
  commantaire_generale: {
    id_commentaire: string;
    text: string[];
    audio: string[];
    image: string[];
    video:string[];
    id_tache: string;
    etat: boolean;
  };
  commentaire_tache: {
    id_commentaire: string;
    text: string[];
    audio: string[];
    image: string[];
    video:string[];
    id_tache: string;
    etat: boolean;
  }[];
  etat: number;
  etat_rapport: boolean;
}
