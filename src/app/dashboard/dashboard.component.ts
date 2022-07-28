import { DashboardService } from './../services/dashboard.service';
import { ParametresComponent } from './../parametres/parametres.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { faClipboardCheck, faClipboardList, faEllipsisV, faGraduationCap, faChevronLeft, faChevronRight, faCog, faSortDown, faSortUp, faChartLine, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { element } from 'protractor';
import { delay } from 'rxjs/operators';
import { simulateLoading } from '../services/utils';

export interface Content {
    production: {
      valeur: number,
      pourcentage: number,
      isNegative: boolean
    },
    temps_de_marche: {
      valeur: number,
      pourcentage: number,
      isNegative: boolean
    },
    stock: {
      valeur: number,
      pourcentage: number,
      isNegative: boolean
    },
    production_chart: {
      name: string,
      series: {name: string,
        value: number}[]
    },
    temps_chart: {
      name: string,
      series: {name: string,
        value: number}[]
    }
    stock_chart: {
      name: string,
      series: {name: string,
        value: number}[]
    }
}
export interface Dashboard {
  global: Content,
  clients: Content[],
  sites: Content[],
  ville: Content
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  progress = faClipboardCheck;
  cap = faGraduationCap;
  board = faClipboardList;
  dots = faEllipsisV;
  arrow_left = faChevronLeft;
  arrow_right = faChevronRight;
  work = faCog;
  under = faSortDown;
  over = faSortUp;
  time = faChartLine;
  stock = faBoxes;
  isCollapsed = false;
  isCollapsed_2 = false;
  data;
  siteValue=0;
  
  //ng Chart Options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Temps';
  timeline: boolean = true;
  Sites : Array<Content> = new Array<Content>();
  refr :any;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  colorScheme = {
    domain: ['rgba(28, 200, 138,1)', 'rgba(78, 115, 223, 1)', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  constructor(private dialogue: MatDialog, private ser: DashboardService) { 
    
  }

  ngAfterViewInit() {
  }
  ngOnInit(): void 
  {
    //--For Demo Purposes--//
    simulateLoading(1000).subscribe((result : any) =>
    {
      this.ser.GetInfo().sites.forEach(element => 
        {
                this.Sites.push(element);
        });
      
    });
    //---------------------/
    
    /*this.ser.GetListSite().subscribe((result : Array<any>) =>
      {
        result.splice(0,1);
          result.forEach(element => 
            {

                  this.ser.GetInfoBySite(element.id).subscribe((res : Content)=>
                  {
                    this.Sites.push(res);
                  });
            });
        
      },
      (error : any)=>{
        this.ser.GetInfo().sites.forEach(element => 
          {
                  this.Sites.push(element);
          });
      });*/
        
        
    
    this.getData();
    this.refr = interval(1000*60).subscribe(x=> {
      this.getData();
    });
  }
  ngOnDestroy()
  {
    clearInterval(this.refr);
    this.refr.unsubscribe();
  }
  async getData(){
    this.data = this.ser.GetInfo();

    // .subscribe((result: Dashboard) =>{
    //   this.data = result;
    // });
  }
  openDialog(){
    /*this.dialogue.open(ParametresComponent, {
      data: {}
    });*/
  }
  openDialog_2(){
    /*this.dialogue.open(ParametresComponent, {
      data: {}
    });*/
  }
  
  decSitesValue(){
    if(this.siteValue === 0)
      return;
    this.siteValue--;
  }
  incSitesValue(){
    
    if(this.siteValue === (this.Sites.length-1))
      return;
    this.siteValue++;
  }
  collapse(){
    this.isCollapsed = !this.isCollapsed;
  }
  collapse_2(){
    this.isCollapsed_2 = !this.isCollapsed_2;
  }
}