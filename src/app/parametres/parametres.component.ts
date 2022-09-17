import { Component, OnInit } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit {
  save = faSave;
  constructor() { }

  ngOnInit(): void {
  }

}
