import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aj-materiel',
  templateUrl: './aj-materiel.component.html',
  styleUrls: ['./aj-materiel.component.scss']
})
export class AjMaterielComponent implements OnInit {

  materiel= new FormGroup({
    nom: new FormControl('', Validators.required),
    nombre: new FormControl('',Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

}
