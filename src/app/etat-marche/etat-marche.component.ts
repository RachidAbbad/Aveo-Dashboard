import { EtatMarcheService } from './../services/etat-marche.service';
import { Component, OnInit } from '@angular/core';
import { faBatteryEmpty, faBatteryFull, faBatteryHalf, faBatteryQuarter, faBatteryThreeQuarters, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface capteur {
  type: string,
  MAC: string,
  etat: string,
  last_value: number
}
interface EtatMarche {
  sites : {
    name: string,
    cartes: {
      heatpilotes:{
        connected : number,
        total : number
      },
      capteurs:{
        connected : number,
        total : number
      },
      equipements:{
        connected : number,
        total : number
      },
      gateways:{
        connected : number,
        total : number
      },
    },
  capteurs: capteur[]
  }[]
}

@Component({
  selector: 'app-etat-marche',
  templateUrl: './etat-marche.component.html',
  styleUrls: ['./etat-marche.component.scss'],
  providers: [EtatMarcheService]
})

export class EtatMarcheComponent implements OnInit {

  data: EtatMarche;
  constructor(private ser: EtatMarcheService) { 
    this.ser.GetInfo().subscribe((result: EtatMarche) => {
      result = this.data;
    })
  }
  battery_empty = faBatteryEmpty;
  battery_half = faBatteryHalf;
  battery_full = faBatteryFull;
  battery_three = faBatteryThreeQuarters;
  battery_quart = faBatteryQuarter;
  arrow_left = faChevronLeft;
  arrow_right = faChevronRight;
  tabValue = 0;
  
  capteurs: capteur[] = [
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 0
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
    { 
      type: "Humidite",
      MAC: "HCO2",
      etat: "Online",
      last_value: 100
    },
  ];
  ngOnInit(): void {
  }
  decValue(){
    if(this.tabValue === 0)
      return;
    this.tabValue--;
  }
  incValue(){
    
    if(this.tabValue === this.data.sites.length)
      return;
    this.tabValue++;
  }
}
