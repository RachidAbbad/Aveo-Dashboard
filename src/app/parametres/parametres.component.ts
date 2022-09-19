import { Component, OnInit } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';
import { serialize } from 'v8';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit {
  save = faSave;
  periodicities:Array<periodicity> = new Array<periodicity>();
  PeriodicitiesSel: Array<any> = new Array<any>();
  form: FormGroup;
  submitted = false;
  private formBuilder: FormBuilder
  
  constructor(private ser:UserService) { }

  ngOnInit(): void {
    this.ser.getPeriodicities().forEach(element=>this.periodicities.push(element));

    this.ser.getUserPeriodicities().subscribe((result : any)=>
  {
    let data= result.data;
    data.forEach((element:any)=>{
        this.PeriodicitiesSel.push(element);
    })
    
  }

)


  }

  

}

interface periodicity{
  id:string;
  value:string
}

