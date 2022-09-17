import {
  faThermometerHalf,
  faTint,
  faWater,
  faCog,
  faLevelDownAlt,
  faBullseye,
} from '@fortawesome/free-solid-svg-icons';
import { SitesService } from './../services/temp/sites.service';
import { CompteurService } from './../services/temp/compteur.service';
import { ConsommationService } from './../services/temp/consommation.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { timer } from 'rxjs';
import { Serie } from './data';

@Component({
  selector: 'chaudiere-dashbord',
  templateUrl: 'chaudiere-dashbord.component.html',
  styleUrls: ['chaudiere.component.css'],
})
export class ChaudiereDashbordComponent implements OnInit {
  id: any = '5fbccf26e06d8cb8a4ac500e';
  sub: any;

  single: Array<Serie>;
  singleupdate: Array<Serie> = new Array<Serie>();
  view: any[] = [350, 280];
  legend: boolean = true;
  legendtext: string = 'Températures';
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#f58686', '#f1950c', '#b86dc5', '#5843ca', '#4385ca', '#43cabe'],
  };

  dataDepression: Array<Serie>;
  dataDepressionUpdate: Array<Serie> = new Array<Serie>();
  viewDepression: any[] = [350, 280];
  Depression: string = 'Dépression';

  colorSchemeDepression = {
    domain: ['#4385ca'],
  };
  dataLumiere: Array<Serie>;
  dataLumiereUpdate: Array<Serie> = new Array<Serie>();
  viewLumiere: any[] = [350, 280];
  Lumiere: string = 'Lumière';

  colorSchemeLumiere = {
    domain: ['#43cabe'],
  };
  temp_icon = faThermometerHalf;
  humidity_icon = faTint;
  fuite_icon = faWater;
  prod_icon = faCog;
  silo_icon = faLevelDownAlt;
  ballon_icon = faBullseye;

  ShowTime: boolean = false;
  dataChartview: any[] = [500, 400];

  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Valeur';
  timeline: boolean = true;

  temperature: any;
  humidite: any;
  taux: any;
  eaudata: any;
  etatColor: any;
  title: any;

  //liste des capteurs
  chaudiere: any;
  server: any;
  eau: any;
  silo: any;
  energy: any;
  ballon: any;
  prod: any;

  live: string = 'En attent...';
  constructor(
    private datepipe: DatePipe,
    private _cons: ConsommationService,
    private _comt: CompteurService,
    private siteService: SitesService,
    private rt: Router,
    private art: ActivatedRoute
  ) {}
  onSelect(data): void {
    var cliked = JSON.parse(JSON.stringify(data));
    //console.log(cliked.name);
    switch (cliked.name) {
      case 'T° Départ':
        window.open(
          'https://admin.viatoile.com/#/clients/chaudiere/' +
            this.id +
            '/brute/td'
        );
        break;
      case 'T° Retour':
        window.open(
          'https://admin.viatoile.com/#/clients/chaudiere/' +
            this.id +
            '/brute/tr',
          '_blank'
        );
        break;
      case 'T° Fumées':
        window.open(
          'https://admin.viatoile.com/#/clients/chaudiere/' +
            this.id +
            '/brute/tf',
          '_blank'
        );
        break;
      case 'T° Inertie':
        window.open(
          'https://admin.viatoile.com/#/clients/chaudiere/' +
            this.id +
            '/brute/ti',
          '_blank'
        );
        break;
      case 'Dépression':
        window.open(
          'https://admin.viatoile.com/#/clients/chaudiere/' +
            this.id +
            '/brute/de',
          '_blank'
        );
        break;
      case 'Luminosité':
        window.open(
          'https://admin.viatoile.com/#/clients/chaudiere/' +
            this.id +
            '/brute/lu',
          '_blank'
        );
        break;
    }
  }

  format(data) {
    return data + ' °C';
  }
  formatD(data) {
    return data.toFixed(2) + '%';
  }
  formatL(data) {
    return data.toFixed(2);
  }

  reportWindowSize() {
    if (window.innerWidth < 450) {
      var width = window.innerWidth * 0.9;

      this.view = [width, 280];
    }
  }

  ngOnInit() {
    var idfuit = '630d0f8bda6299878c4b8f2e';

    /*
        this._comt.GetCompteurById("630d0891da6299878c4b8f28").subscribe(result =>{
          this.chaudiere = result.data;
        });
        this._comt.GetCompteurById("600860a9d3628f52ed61b9ff").subscribe(result =>{
          this.server = result.data;
        });
        this._comt.GetCompteurById("630d0f8bda6299878c4b8f2e").subscribe(result =>{
          this.eau = result.data;
        });*/
    let t = timer(0, 40000);
    this.sub = t.subscribe((t) => {
      this.getEauData(idfuit);
      this.getDataByCapteur('630d0891da6299878c4b8f28', 1);
      this.getserverbysite('630d1f67da6299878c4b8f2f');
      this.GetCurrentdata(
        '630d0891da6299878c4b8f28',
        '630d0a53da6299878c4b8f29',
        '630c8f70ea1fb79ced80c6fb',
        '630c9cac9064c0418ce1ab6d'
      );
    });

    this.reportWindowSize();
  }
  getserverbysite(id) {
    this.getmaxminbysite(id);

    this._cons.GetCurrentByIdCompteur(id, 1, 'server').subscribe((result) => {
      console.log(result.data);
      this.humidite = result.data[0].humidite;
      this.temperature = result.data[0].temperature;
      this.server = result.data[0];
    });
  }
  GetCurrentdata(idChaudiere,idBallon, idsilo, idprod) {
    this._cons.GetCurrentChaudiere(idChaudiere,1).subscribe((result) => {
      console.log(result.data[0])
      this.chaudiere = result.data[0];
    });
    this._cons.GetCurrentBallonById(idBallon).subscribe((result) => {
      //console.log(result.data)
      this.ballon = result.data[0];
    });
    this._cons.GetCurrentProdById(idprod).subscribe((result) => {
      //console.log(result.data)
      this.energy = result.data[0];
      this.prod = result.data[0].puissance_Instantanée;
    });
    this._cons.GetCurrentSiloById(idsilo).subscribe((result) => {
      //console.log(result.data)
      this.silo = result.data[0];
    });
  }
  getEauData(id) {
    this._cons.GetLastEauBeat(id).subscribe((result) => {
      console.log(result);
      this.eau = result.data;
      var now = new Date();
      var last = new Date(result.data.timestamp);
      var timedif = this.getMinutesBetweenDates(last, now);
      if (timedif >= 20) {
        this.title = 'Capteur non détecté';
        this.live = '';
        this.etatColor = 'linear-gradient(87deg,#9e2323,#5e0404)';
      } else {
        this._cons.GetCurrentEauData(id, 1).subscribe((result) => {
          this.eaudata = result.data;
          switch (this.eaudata.etat) {
            case 1:
              this.etatColor = 'linear-gradient(87deg,#62e45e,#089620)';
              this.title = 'Capteur actif/fermé';
              break;
            case 2:
              this.etatColor = 'linear-gradient(87deg,#23909e,#065f75)';
              this.title = 'Capteur ouvert';
              break;
            case 3:
              this.etatColor = 'linear-gradient(87deg,#e4795e,#da6b38)';
              this.title = "Detection de fuit d'eau";
              break;
            case 4:
              this.etatColor = 'linear-gradient(87deg,#9e2323,#5e0404)';
              this.title = "Capteur ouvert + fuit d'eau";
              break;
          }
        });
        //console.log("now "+now.toString()+" last "+last.toString()+" timedif "+timedif);
      }
    });
  }
  getMinutesBetweenDates(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    return diff / 60000;
  }
  getmaxminbysite(id) {
    var dts = new Date();
    var dte = new Date();
    dte.setHours(0);
    dts.setHours(23);
    dte.setMinutes(0);
    dts.setMinutes(59);

    var startdate = this.datepipe.transform(dte, 'yyyy-MM-ddTHH:mm:00');
    var enddate = this.datepipe.transform(dts, 'yyyy-MM-ddTHH:mm:00');
    // this._cons.GetMaxMinByIdCompteur(id,startdate,enddate).subscribe(
    //     result => {
    //         if(result.data.length>0)
    //           this.taux = result.data;
    //         //console.log(this.taux)
    //     }
    // );
  }
  getDataByCapteur(id: any, n: Number) {
    this._cons.GetCurrentChaudiere(id, n).subscribe((result) => {
      this.updatedata(result.data, 0);
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    //$('body .modals').remove();
  }

  updatedata(data, interval) {
    this.singleupdate = [];
    this.dataDepressionUpdate = [];
    this.dataLumiereUpdate = [];
    for (let value of data) {
      var dt = new Date(value.timestamp);
      dt.setHours(dt.getHours() + interval);

      this.singleupdate.push(new Serie('T° Départ', value.temperatura_Ida));
      this.singleupdate.push(new Serie('T° Retour', value.temperatura_Retorno));
      this.singleupdate.push(
        new Serie('T° Inertie', value.temperatura_Inercia)
      );
      this.singleupdate.push(new Serie('T° Fumées', value.temperatura_Humos));
      this.single = this.singleupdate;
      this.dataDepressionUpdate.push(new Serie('Dépression', value.dépression));
      this.dataDepression = this.dataDepressionUpdate;
      this.dataLumiereUpdate.push(new Serie('Luminosité', value.luminosidad));
      this.dataLumiere = this.dataLumiereUpdate;
    }
  }
}
