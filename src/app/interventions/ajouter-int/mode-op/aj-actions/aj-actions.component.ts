import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import {ENTER} from '@angular/cdk/keycodes';
import { MatChip, MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { equipementAction } from '../mode-op.component';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-aj-actions',
  templateUrl: './aj-actions.component.html',
  styleUrls: ['./aj-actions.component.scss']
})

export class AjActionsComponent implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  cancel = faTimesCircle;
  readonly separatorKeysCodes = [ENTER] as const;
  @ViewChild('actionInput') actionInput: ElementRef<HTMLInputElement>;
  group = new FormGroup({
    equipement: new FormControl('',Validators.required),
    actions: new FormControl('')
  });
  allEquipements: string[] = [
    "Grilles Latérales",
    "Grilles Volcan",
    "Coins Volcan",
    "Support des grilles latérales",
    "Gaine vis foyer",
    "Echangeur chambre foyer",
    "1er Echangeur tubulaire",
    "2eme Echangeur tubulaire",
    "Cyclone",
    "Cheminée",
    "Ventilateur air primaire",
    "Ventilateur air secondaire",
    "Ventilateur porte foyer",
    "Ventilateur d’extracteur",
    "Ressorts",
    "Axes",
    "Supports des ressorts",
    "Paliers",
    "Moteurs d'entrainement des axes de ramonage et système d'entrainement",
    "Vis sans fin silo (motoréducteur, palier, axe, gaine, filets, pas)",
    "Vis sans fin trémie (motoréducteur palier, axe, gaine, filets, pas)",
    "Vis sans fin foyer (motoréducteur, palier, axe, gaine, filets, pas, pignon chaine)",
    "Vis sans fin cendre (motoréducteur palier, axe, gaine, filets, pas)",
    "Etat de Silo",
    "Trappe de visite",
    "Porte d'évacuation de Silo",
    "Pompe jumelée de circulation",
    "Pompe anti condensation",
    "Pompe porte foyer",
    "Pompe de Transfert",
    "Contrôle de l'état du ballon de stockage (Soupape de sécurité, Isolation et étanchéité)",
    "Contrôle des vannes d'arrêt",
    "Pt 100 aller",
    "Pt 100 retour",
    "Pt fumée",
    "Pt 100 ballon",
    "Sonde trémie",
    "Sonde registre vis foyer",
    "Photocellule",
    "Contrôleur de débit"
  ];
  allActions: string[] = [
    "Nettoyage et Contrôle visuelle Avec Prise de photo",
    "Contrôle visuelle Avec Prise de photo",
    "Contrôle-Nettoyage si necessaire",
    "Contrôle mécanique, éléctrique et dépoussièrage Avec Prise de photo",
    "Contrôle et nettoyage",
    "Contrôle visiuelle",
    "Contrôle-Graissage",
    "Contrôle mécanique et éléctrique",
    "Contrôle-Graissage de palier",
    "Contrôle-Graissage de palier-niveau de huile",
    "Contrôle-Nettoyage-Contrôle de l'étanchéité de silo",
    "Contrôle",
    "Contrôle-ouverture et fermeture de la porte",
    "Contrôle visiuelle du bon fonctionnement",
    "Contrôle-Ouverture et fermeture des vannes-Contrôle d'étanchéité",
    "Contrôle du bon fonctionnement"
  ];
  filteredActions: Observable<string[]>;
  filteredEquipements: Observable<string[]>;
  actions: String[] = [
  ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.actions.push(value);
      
    }
    event.chipInput!.clear();
  }

  remove(action: string): void {
    const index = this.actions.indexOf(action);

    if (index >= 0) {
      this.actions.splice(index, 1);
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: equipementAction) {
    if(data != undefined && data != null){
      this.actions = data.action;
      this.group.setValue({equipement: data.nom_equipement, actions: ''});
    }
    this.filteredActions = this.group.get("actions").valueChanges.pipe(
      startWith(null),
      map((action: string | null) => action ? this._filterActions(action) : this.allActions.slice()));
      this.filteredEquipements = this.group.get("equipement").valueChanges.pipe(
        startWith(null),
        map((action: string | null) => action ? this._filterEquipement(action) : this.allEquipements.slice()));
  }

  ngOnInit(): void {
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.actions.push(event.option.viewValue);
    this.actionInput.nativeElement.value = '';
    this.group.get("actions").setValue(null);
  }
  private _filterActions(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allActions.filter(action => action.toLowerCase().includes(filterValue));
  }
  private _filterEquipement(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEquipements.filter(action => action.toLowerCase().includes(filterValue));
  }

}
