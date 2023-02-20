import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-periode',
  templateUrl: './custom-periode.component.html',
  styleUrls: ['./custom-periode.component.scss']
})
export class CustomPeriodeComponent implements OnInit {

  customPeriode= new FormGroup({
    dateStart: new FormControl('', Validators.required),
    dateEnd: new FormControl('',Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

}
