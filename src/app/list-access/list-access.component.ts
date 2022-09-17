import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-access',
  templateUrl: './list-access.component.html',
  styleUrls: ['./list-access.component.scss']
})
export class ListAccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  selectedOptions = [];
  listeSite = this.data;
  list = new FormControl('', Validators.required);

  ngOnInit(): void {
  }
  
  onChange(event){
    this.selectedOptions = event;
  }

}
