import {Series} from './Series';
export class Mdata
    {
      name: string="";
      series: Array<Series> = new Array<Series>();
      constructor(name:string,series:Array<Series>)
      {
          this.name=name;
          this.series=series;
      }
        
    }

  