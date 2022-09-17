import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aj-outils',
  templateUrl: './aj-outils.component.html',
  styleUrls: ['./aj-outils.component.scss']
})
export class AjOutilsComponent implements OnInit {

  outil = new FormGroup({
    nom: new FormControl('', Validators.required),
  });
  constructor() { }

  ngOnInit(): void {
  }

}
