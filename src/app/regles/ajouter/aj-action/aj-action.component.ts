import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InterventionService } from './../../../services/intervention.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-aj-action',
  templateUrl: './aj-action.component.html',
  styleUrls: ['./aj-action.component.scss']
})
export class AjActionComponent implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  cancel = faTimesCircle;
  readonly separatorKeysCodes = [ENTER] as const;
  quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, false] }],
      [{ color: [] }]
    ],
  };
  filteredResponsablesNotif: Observable<User[]>;
  filteredResponsablesAlerte: Observable<User[]>;
  allResponsables: User[] = [];
  alerteGroup = new FormGroup({
    texte: new FormControl('', Validators.required),
    responsables: new FormControl(''),
    criticalite: new FormControl(0, Validators.required)
  });
  notificationGroup = new FormGroup({
    texte: new FormControl('', Validators.required),
    responsables: new FormControl(''),
    criticalite: new FormControl(null, Validators.required)
  });
  recepteurs: string[]= [];
  actions=["Notification", "Alerte"];
  action: string;
  actionToReturn: Action;

  @ViewChild('recepteurInput') recepteurInput: ElementRef<HTMLInputElement>;

  /*{
  "id_action": "7e686edb-7703-ea1d-b9e3-e06da7ed549b",
  "type": "Notification",
  "title": "",
  "content": "test ",
  "criticite": 2,
  "id_recepteurs": [
    "anas@mail.com"
  ]
}
*/

  constructor( private cd: ChangeDetectorRef, private ser: InterventionService, @Inject(MAT_DIALOG_DATA) private data) { 
    this.ser.getResponsable().subscribe((result:any) => {
      this.allResponsables = result.data;
    });
    this.filteredResponsablesNotif = this.notificationGroup.get("responsables").valueChanges.pipe(
      startWith(null),
      map((responsable: User | null) => responsable ? this._filterResponsable(responsable) : this.allResponsables.slice()));
    this.filteredResponsablesAlerte = this.alerteGroup.get("responsables").valueChanges.pipe(
      startWith(null),
      map((responsable: User | null) => responsable ? this._filterResponsable(responsable) : this.allResponsables.slice()));
   }

  ngOnInit(): void {
    if(this.data == undefined || this.data == null) return;
    else if(this.data.type == "Notification"){
      this.action = "Notification";
      this.recepteurs = this.data.id_recepteurs;
      this.notificationGroup.get('texte').setValue(this.data.content);
      this.notificationGroup.get('criticalite').setValue(this.data.criticite.toString());
    }
    else if(this.data.type == "Alerte"){
      this.action = "Alerte";
      this.recepteurs = this.data.id_recepteurs;
      this.alerteGroup.get('texte').setValue(this.data.content);
      this.alerteGroup.get('criticalite').setValue(this.data.criticite);
    }
  }
  selectedNotification(event: MatAutocompleteSelectedEvent): void {
    this.recepteurs.push(event.option.viewValue);
    this.recepteurInput.nativeElement.value = '';
    this.notificationGroup.get("responsables").setValue('');
  }
  selectedAlerte(event: MatAutocompleteSelectedEvent): void {
    this.recepteurs.push(event.option.viewValue);
    this.recepteurInput.nativeElement.value = '';
    this.alerteGroup.get("responsables").setValue('');
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.recepteurs.push(value);
      
    }
    event.chipInput!.clear();
  }
  private _filterResponsable(value: User): User[] {
    const filterValue = value.email.toLowerCase();

    return this.allResponsables.filter(resp => resp.email.toLowerCase().includes(filterValue));
  }
  remove(recepteur: string): void {
    const index = this.recepteurs.indexOf(recepteur);

    if (index >= 0) {
      this.recepteurs.splice(index, 1);
    }
  }
  sendData(){
    if(this.action == "Notification"){
      return this.actionToReturn = {
        content: this.notificationGroup.get("texte").value,
        criticite: parseInt(this.notificationGroup.get('criticalite').value),
        id_action: UUID.UUID(),
        id_recepteurs: this.recepteurs,
        title: "",
        type: "Notification"
      };
    }
    else if(this.action == "Alerte"){
      return this.actionToReturn = {
        content: this.alerteGroup.get("texte").value,
        criticite: parseInt(this.alerteGroup.get('criticalite').value),
        id_action: UUID.UUID(),
        id_recepteurs: this.recepteurs,
        title: "",
        type: "Alerte"
      };
    }
  }
  disable(){
    if(this.action == "Notification"){
      if(this.notificationGroup.invalid == false){
        this.sendData();
      }
      return this.notificationGroup.invalid;
    }
    else if(this.action == "Alerte"){
      if(this.alerteGroup.invalid == false){
        this.sendData();
      }
      return this.alerteGroup.invalid;
    }
    else
      return true;
  }

}
export interface Action {
  type: string;
  id_action: string;
  title: string;
  content: string;
  criticite: number;
  id_recepteurs: string[];
}