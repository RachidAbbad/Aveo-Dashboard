import { DashboardService } from './../services/dashboard.service';
import { ParametresComponent } from './../parametres/parametres.component';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import {
  faClipboardCheck,
  faClipboardList,
  faEllipsisV,
  faGraduationCap,
  faChevronLeft,
  faChevronRight,
  faCog,
  faSortDown,
  faSortUp,
  faChartLine,
  faBoxes,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { element } from 'protractor';
import { UserService } from '../services/user.service';
import { CustomPeriodeComponent } from './custom-periode/custom-periode.component';

export interface Content {
  name: string;
  production: {
    valeur: number;
    pourcentage: number;
    isNegative: boolean;
  };
  temps_de_marche: {
    valeur: number;
    pourcentage: number;
    isNegative: boolean;
  };
  stock: {
    valeur: number;
    pourcentage: number;
    isNegative: boolean;
  };
  production_chart: {
    name: string;
    series: { name: string; value: number }[];
  };
  temps_chart: {
    name: string;
    series: { name: string; value: number }[];
  };
  stock_chart: {
    name: string;
    series: { name: string; value: number }[];
  };
}
export interface Dashboard {
  global: Content;
  clients: Content[];
  sites: Content[];
  ville: Content;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('Turn')
  private Turn: TemplateRef<any>;

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
  siteValue = 0;
  PeriodicitiesSel: Array<any> = new Array<any>();
  listSites: Array<any> = new Array<any>();

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
  Sites: Array<Content> = new Array<Content>();
  refr: any;
  colorScheme = {
    domain: [
      'rgba(28, 200, 138,1)',
      'rgba(78, 115, 223, 1)',
      '#CFC0BB',
      '#7aa3e5',
      '#a8385d',
      '#aae3f5',
    ],
  };
  constructor(
    private dialogue: MatDialog,
    private ser: DashboardService,
    private userService: UserService
  ) {}

  ngAfterViewInit() {}
  ngOnInit(): void {
    this.ser.GetListSite().subscribe((result: Array<any>) => {
      console.log(result);
      result.forEach((element) => {
        this.listSites.push(element);
        this.ser.GetInfoBySite(element.id).subscribe((res: Content) => {
          this.Sites.push(res);

          console.log(res);
        });
      });
    });

    this.getData();
    this.refr = interval(1000 * 60).subscribe((x) => {
      this.getData();
    });

    this.userService.getUserPeriodicities().subscribe((result: any) => {
      let data = result.data;
      data.forEach((element: any) => {
        this.PeriodicitiesSel.push(element);
      });
    });
  }
  ngOnDestroy() {
    clearInterval(this.refr);
    this.refr.unsubscribe();
  }
  async getData() {
    //this.data = this.ser.GetInfo()

    this.ser.GetInfo().subscribe((result: any) => {
      this.data = result;
      console.log(result);
    });
  }
  openDialog() {
    this.dialogue.open(ParametresComponent, {
      data: {},
    });
  }
  openDialog_2() {
    this.dialogue.open(ParametresComponent, {
      data: {},
    });
  }

  decSitesValue() {
    if (this.siteValue === 0) return;
    this.siteValue--;
  }
  incSitesValue() {
    if (this.siteValue === this.Sites.length - 1) return;
    this.siteValue++;
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  collapse_2() {
    this.isCollapsed_2 = !this.isCollapsed_2;
  }

  changePeriodicitie(event) {
    console.log(event.value);
    if (event.value == '6334f6f6eb8159c1a2273b5d') {
      
      let dialogRef = this.dialogue.open(CustomPeriodeComponent);
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log(result);

        let loadingDialog = this.dialogue.open(this.Turn, {
          width: '300px',
        })
        loadingDialog.disableClose = true;

          this.ser.GetGlobalInfosDate(result.dateStart, result.dateEnd).subscribe((result) => {
            this.data = result;
            loadingDialog.close();
          });
        
      });
      return;
    }


    //Non custom periods : 
    let loadingDialog = this.dialogue.open(this.Turn, {
      width: '300px',
    })
    loadingDialog.disableClose = true;

    let dateAfterPeriode = new Date();
    dateAfterPeriode.setDate(
      dateAfterPeriode.getDate() -
      this.PeriodicitiesSel.find((obj) => {
        return obj.id === event.value;
      }).periode
    );


      this.ser.GetGlobalInfosDate(dateAfterPeriode, new Date()).subscribe((result) => {
        this.data = result;
        console.log(result);
        loadingDialog.close();
      });
  
  }
}
