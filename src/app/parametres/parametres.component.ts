import { Component, OnInit } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';
import { serialize } from 'v8';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit {
  save = faSave;
  periodicities:Array<periodicity> = new Array<periodicity>();
  
  constructor(private ser:UserService) { }

  ngOnInit(): void {
    this.ser.getPeriodicities().forEach(element=>this.periodicities.push(element));
  }


}

interface periodicity{
  id:string;
  value:string
}
