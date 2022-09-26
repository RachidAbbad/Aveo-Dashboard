import { Component, OnInit } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';
import { serialize } from 'v8';
import { UserService } from '../services/user.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
})
export class ParametresComponent implements OnInit {
  save = faSave;
  periodicities: Array<periodicity> = new Array<periodicity>();
  periodicitiesUser: Array<any> = new Array<any>();
  settingsForm: FormGroup;
  submitted = false;
  buttonStat = true;
  settings = new FormGroup({});

  constructor(private ser: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //Init Parameters Form Controls
    this.settingsForm = new FormGroup({
      periodesCheckBoxs : new FormGroup({})
    });
    //Get All Periodecities
    this.ser.getPeriodicities().forEach((element) => {
      this.periodicities.push(element);
    });

    this.ser.getUserPeriodicities().subscribe((result: any) => {
      let data = result.data;
      console.log(data);
      data.forEach((element: any) => {
        this.periodicitiesUser.push(element);
      });
      this.getPeriodecitiesCheckBoxs(this.settingsForm.get('periodesCheckBoxs') as FormGroup);
    });
    
  }

  getPeriodecitiesCheckBoxs(formGroup:FormGroup) {
    this.periodicities.forEach((element) => {
      formGroup.addControl(element.value, new FormControl(this.periodicitiesUser.filter(e => e.value === element.value).length > 0));
    });
  }

  onSubmit(form:any){
    this.submitted = true;
    console.log(form.value);
    //Save Periodicities Preferred:
    let periodes = new Array<string>();
    this.periodicities.forEach((element, index)=>{
      if(form.value.periodesCheckBoxs[element.value]) 
        periodes.push(element.id)
    })
    this.ser.saveUserPeriodicities(periodes).subscribe((result)=>{
      this.buttonStat = true;
    });

  }

  changeCheck(control, event){
    control = this.settingsForm.get('periodesCheckBoxs').get(control).setValue(event.target.checked);
    this.buttonStat = false;
  }
}

interface periodicity {
  id: string;
  value: string;
}
