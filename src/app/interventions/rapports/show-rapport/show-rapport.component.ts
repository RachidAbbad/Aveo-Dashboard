import { Router } from '@angular/router';
import { InterventionService } from './../../../services/intervention.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Rapport } from '../rapports.component';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-rapport',
  templateUrl: './show-rapport.component.html',
  styleUrls: ['./show-rapport.component.scss']
})
export class ShowRapportComponent implements OnInit {

  @Output() returner: EventEmitter<any> = new EventEmitter<any>();
  @Input() element: Rapport;
  back = faAngleLeft;

  constructor(private ser: InterventionService, private router: Router) {
  }
  


  ngOnInit(): void {
    
  }
  relancer(){
    this.ser.getInterventionsbyID(this.element.id_intervention).subscribe((result: any) =>{
      result.data.date = "";
      this.ser.setIntervention(result.data);
      this.returner.emit(null);
      this.router.navigate(['/home/ajouterIntervention']);
    });
  }
  valider(){
    this.ser.validateRapport(JSON.parse("true"), this.element);
    setTimeout(()=>{this.returner.emit(null)}, 1000);
  }
  return(){
    setTimeout(()=>{this.returner.emit(null)}, 200);
  }
  roundTo(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  }
  returnEtat(element){
    if(element.etat)
    return "Validée";
    else
    return "Non Validée";
  }
  returnetatClass(element){
    if(element.etat)
    return "text-success";
    else
    return "text-info";
  }

}
