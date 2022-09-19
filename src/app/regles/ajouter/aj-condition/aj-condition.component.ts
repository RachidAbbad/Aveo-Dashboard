import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegleService } from './../../../services/regle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'app-aj-condition',
  templateUrl: './aj-condition.component.html',
  styleUrls: ['./aj-condition.component.scss']
})
export class AjConditionComponent implements OnInit {

  conditions = ["Seuil sur Valeur", "Jour de la Semaine"];
  condition: string;
  conditionToReturn: Condition;
  seuilGroup = new FormGroup({
    liste_seuil: new FormControl('', Validators.required),
    senseur: new FormControl('', Validators.required),
    unite: new FormControl('', Validators.required),
    max_min: new FormControl('', Validators.required),
    valeur: new FormControl('', Validators.required)
  });
  jourGroup = new FormGroup({
    jour: new FormControl(0, Validators.required)
  });
  senseurs: Sensor[] = [];
  payload: any[] = [];
  selectedOptions = [];
  jour = new FormControl('');


  constructor(private ser: RegleService, @Inject(MAT_DIALOG_DATA) private data) { }


  ngOnInit(): void {
    if (this.data.object && this.data.object.type_condition == "seuil") {
      this.condition = "Seuil sur Valeur";
      this.seuilGroup.get('liste_seuil').setValue(this.data.object.type_seuil);
      this.ser.getSenseur(this.data.object.type_seuil, this.data.site).subscribe((result: any) => {
        this.senseurs = Array.from(result.data);
        this.senseurs.forEach((senseur, index) => {
          this.payload.splice
          let payloads = senseur.payload.replace(/ /g, '').replace(/"/g, '').replace(/ /g, '').replace(/\{/g, '').replace(/:/g, '').replace(/\}/g, '').replace(/\,/g, '').split('0');
          let i = payloads.findIndex((element) => {
            if (element == "")
              return true;
          })
          payloads.splice(i, 1);
          this.senseurs[index].payload = payloads;
          this.change({value: this.data.object.id_capteur});
          this.seuilGroup.get('senseur').setValue(this.data.object.id_capteur);
          this.seuilGroup.get('unite').setValue(this.data.object.parameter_name);
          this.seuilGroup.get('max_min').setValue(this.data.object.type);
          this.seuilGroup.get('valeur').setValue(this.data.object.value);
        });
      });
    }
    else if (this.data.object && this.data.object.type_condition == "jour") {
      this.condition = "Jour de la Semaine";
      this.jour.setValue(this.data.object.nom_jour);
      this.selectedOptions = this.data.object.nom_jour;
    }
  }
  disable() {
    if (this.condition == "Seuil sur Valeur") {
      if (this.seuilGroup.invalid == false) {
        this.sendData();
      }
      return this.seuilGroup.invalid;
    }
    else if (this.condition == "Jour de la Semaine") {
      if (this.jourGroup.invalid == false) {
        this.sendData();
      }
      return this.jourGroup.invalid;
    }
    else
      return true;
  }
  sendData() {
    if (this.condition == "Seuil sur Valeur") {
      let senseur = this.senseurs.find((sens) => {
        if (sens.id == this.seuilGroup.get('senseur').value)
          return true;
      });
      return this.conditionToReturn = {
        id_capteur: senseur.id,
        id_condition: UUID.UUID(),
        nom_jour: "",
        type: this.seuilGroup.get('max_min').value,
        type_condition: "seuil",
        type_seuil: this.seuilGroup.get('liste_seuil').value,
        parameter_name: this.seuilGroup.get('unite').value,
        value: parseInt(this.seuilGroup.get('valeur').value)
      }
    }
    else if (this.condition == "Jour de la Semaine") {
      return this.conditionToReturn = {
        id_capteur: "",
        id_condition: UUID.UUID(),
        nom_jour: this.jour.value,
        type: "",
        type_condition: "jour",
        type_seuil: "",
        parameter_name: "",
        value: parseInt('0')
      }
    }

  }
  returnData() {
    return this.conditionToReturn;
  }
  change(event) {
    let id = event.value;
    let index = this.senseurs.findIndex((element) => {
      if (id == element.id)
        return true;
    });
    this.payload = this.senseurs[index].payload;
  }
  fetchSensor(event) {
    this.ser.getSenseur(event.value, this.data.site).subscribe((result: any) => {
      this.senseurs = result.data;
      this.senseurs.forEach((senseur, index) => {
        this.payload.splice
        let payloads = senseur.payload.replace(/ /g, '').replace(/"/g, '').replace(/ /g, '').replace(/\{/g, '').replace(/:/g, '').replace(/\}/g, '').replace(/\,/g, '').split('0');
        let i = payloads.findIndex((element) => {
          if (element == "")
            return true;
        })
        payloads.splice(i, 1);
        this.senseurs[index].payload = payloads;
      });
    });
  }

}
export interface Condition {
  id_condition: string;
  type: string;
  id_capteur: string;
  parameter_name: string;
  type_condition: string;
  type_seuil: string;
  nom_jour: string;
  value: number;
}
export interface Sensor {
  id: string;
  type: string;
  tag: string;
  macAbv: number;
  cumule: number;
  etat: number;
  interval: number;
  active: boolean;
  ref_id_org: string;
  ref_id_site: string;
  battery: number;
  version: string;
  ip: string;
  ssid: string;
  password: string;
  payload: any;
  lasinsert: string;
}