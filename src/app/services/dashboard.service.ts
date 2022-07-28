import { Dashboard } from './../dashboard/dashboard.component';
import { Observable, Subscriber } from 'rxjs';
import { UserService } from './user.service';
import { Globalpath } from './globalPath';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  private URL = Globalpath.global_path;
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.token });
  private user: {
    id: string;
    name: string;
    prenom: string;
    gsm: string;
    email: string;
    alertemail: string;
    password: string;
    type_user: number;
    id_org: string;
    id_site: string;
    id_capteur: string;
    createdOn: string;
  };

  constructor(private http: HttpClient, private ser: UserService) {
    this.user = ser.currentUser;
  }

  GetInfo() {
    // return this.http.get(this.URL+'/api/Dashboard/dashboard/'+ this.user.id_org, {
    //   headers: this.headers
    // });
    return {
        global: {
          production: { isNegative: true, pourcentage: 40, valeur: 200 },
          stock: { isNegative: false, pourcentage: 0, valeur: 0 },
          temps_de_marche: { isNegative: false, pourcentage: 8, valeur: 10 },
          production_chart: {
            name: "Production",
            series: [
              {
                name: "Jan 2021",
                value: 200
              },
              {
                name: "Fev 2021",
                value: 204
              },
              {
                name: "Mar 2021",
                value: 210
              },
              {
                name: "Avr 2021",
                value: 240
              },
              {
                name: "Mai 2021",
                value: 200
              },
              {
                name: "Juin 2021",
                value: 190
              },
              {
                name: "Juil. 2021",
                value: 205
              },
              {
                name: "Août 2021",
                value: 230
              },
              {
                name: "Sept. 2021",
                value: 220
              },
              {
                name: "Oct. 2021",
                value: 200
              },
              {
                name: "Nov. 2021",
                value: 200
              },
              {
                name: "Dec. 2021",
                value: 190
              },
              {
                name: "Jan 2022",
                value: 205
              },
              {
                name: "Fev 2022",
                value: 230
              },
              {
                name: "Avril 2022",
                value: 220
              },
              {
                name: "Mai 2022",
                value: 200
              }
            ]
            
          },
          stock_chart: {
            name: "Stock Globale",
            series: [
              {
                name: "Jan 2021",
                value: 200
              },
              {
                name: "Fev 2021",
                value: 204
              },
              {
                name: "Mar 2021",
                value: 210
              },
              {
                name: "Avr 2021",
                value: 240
              },
              {
                name: "Mai 2021",
                value: 200
              },
              {
                name: "Juin 2021",
                value: 190
              },
              {
                name: "Juil. 2021",
                value: 205
              },
              {
                name: "Août 2021",
                value: 230
              },
              {
                name: "Sept. 2021",
                value: 220
              },
              {
                name: "Oct. 2021",
                value: 200
              },
              {
                name: "Nov. 2021",
                value: 200
              },
              {
                name: "Dec. 2021",
                value: 190
              },
              {
                name: "Jan 2022",
                value: 205
              },
              {
                name: "Fev 2022",
                value: 230
              },
              {
                name: "Avril 2022",
                value: 220
              },
              {
                name: "Mai 2022",
                value: 200
              }
            ]
            
          },
          temps_chart:{
            name: "Temps de Marche",
            series: [
              {
                name: "Jan 2021",
                value: 2
              },
              {
                name: "Fev 2021",
                value: 3
              },
              {
                name: "Mar 2021",
                value: 6
              },
              {
                name: "Avr 2021",
                value: 10
              },
              {
                name: "Mai 2021",
                value: 20
              },
              {
                name: "Juin 2021",
                value: 5
              },
              {
                name: "Juil. 2021",
                value: 3
              },
              {
                name: "Août 2021",
                value: 1
              },
              {
                name: "Sept. 2021",
                value: 20
              },
              {
                name: "Oct. 2021",
                value: 16
              },
              {
                name: "Nov. 2021",
                value: 17
              },
              {
                name: "Dec. 2021",
                value: 20
              },
              {
                name: "Jan 2022",
                value: 24
              },
              {
                name: "Fev 2022",
                value: 16
              },
              {
                name: "Mars 2022",
                value: 20
              },
              {
                name: "Avril 2022",
                value: 16
              }
            ]
          }
        },
        sites:[
          {
            id : 56,
            name : "Marrakech (Soft)",
            production: {isNegative: false, pourcentage: 2, valeur: 310},
            stock: {isNegative: false, pourcentage: 5,valeur: 21},
            temps_de_marche: {isNegative: true, pourcentage: 2, valeur: 10},
            production_chart:{
              name: "Production",
              series: [
                {
                  name: "Jan 2021",
                  value: 200
                },
                {
                  name: "Fev 2021",
                  value: 204
                },
                {
                  name: "Mar 2021",
                  value: 210
                },
                {
                  name: "Avr 2021",
                  value: 240
                },
                {
                  name: "Mai 2021",
                  value: 200
                },
                {
                  name: "Juin 2021",
                  value: 190
                },
                {
                  name: "Juil. 2021",
                  value: 205
                },
                {
                  name: "Août 2021",
                  value: 230
                },
                {
                  name: "Sept. 2021",
                  value: 220
                },
                {
                  name: "Oct. 2021",
                  value: 200
                },
                {
                  name: "Nov. 2021",
                  value: 200
                },
                {
                  name: "Dec. 2021",
                  value: 190
                },
                {
                  name: "Jan 2022",
                  value: 205
                },
                {
                  name: "Fev 2022",
                  value: 230
                },
                {
                  name: "Avril 2022",
                  value: 220
                },
                {
                  name: "Mai 2022",
                  value: 200
                }
              ]
              
            },
            stock_chart:{
              name: "Niveau Silo",
              series: [
                {
                  name: "Jan 2021",
                  value: 90
                },
                {
                  name: "Fev 2021",
                  value: 100
                },
                {
                  name: "Mar 2021",
                  value: 80
                },
                {
                  name: "Avr 2021",
                  value: 70
                },
                {
                  name: "Mai 2021",
                  value: 60
                },
                {
                  name: "Juin 2021",
                  value: 40
                },
                {
                  name: "Juil. 2021",
                  value: 60
                },
                {
                  name: "Août 2021",
                  value: 100
                },
                {
                  name: "Sept. 2021",
                  value: 50
                },
                {
                  name: "Oct. 2021",
                  value: 40
                },
                {
                  name: "Nov. 2021",
                  value: 80
                },
                {
                  name: "Dec. 2021",
                  value: 90
                },
                {
                  name: "Jan 2022",
                  value: 100
                },
                {
                  name: "Fev 2022",
                  value: 40
                },
                {
                  name: "Avril 2022",
                  value: 50
                },
                {
                  name: "Mai 2022",
                  value: 30
                }
              ]
              
            },
            temps_chart: {
              name: "Temps de Marche",
              series: [
                {
                  name: "Jan 2021",
                  value: 2
                },
                {
                  name: "Fev 2021",
                  value: 3
                },
                {
                  name: "Mar 2021",
                  value: 6
                },
                {
                  name: "Avr 2021",
                  value: 10
                },
                {
                  name: "Mai 2021",
                  value: 20
                },
                {
                  name: "Juin 2021",
                  value: 5
                },
                {
                  name: "Juil. 2021",
                  value: 3
                },
                {
                  name: "Août 2021",
                  value: 1
                },
                {
                  name: "Sept. 2021",
                  value: 20
                },
                {
                  name: "Oct. 2021",
                  value: 16
                },
                {
                  name: "Nov. 2021",
                  value: 17
                },
                {
                  name: "Dec. 2021",
                  value: 20
                },
                {
                  name: "Jan 2022",
                  value: 24
                },
                {
                  name: "Fev 2022",
                  value: 16
                },
                {
                  name: "Mars 2022",
                  value: 20
                },
                {
                  name: "Avril 2022",
                  value: 16
                }
              ]
            }
            },

            {
              id : 56,
              name : "Tanger (GeoLab)",
              production: {isNegative: true, pourcentage: 27, valeur: 368},
              stock: {isNegative: false, pourcentage: 7,valeur: 45},
              temps_de_marche: {isNegative: true, pourcentage: 5, valeur: 13},
              production_chart:{
                name: "Production",
                series: [
                  {
                    name: "Jan 2021",
                    value: 387
                  },
                  {
                    name: "Fev 2021",
                    value: 304
                  },
                  {
                    name: "Mar 2021",
                    value: 310
                  },
                  {
                    name: "Avr 2021",
                    value: 340
                  },
                  {
                    name: "Mai 2021",
                    value: 300
                  },
                  {
                    name: "Juin 2021",
                    value: 390
                  },
                  {
                    name: "Juil. 2021",
                    value: 305
                  },
                  {
                    name: "Août 2021",
                    value: 330
                  },
                  {
                    name: "Sept. 2021",
                    value: 320
                  },
                  {
                    name: "Oct. 2021",
                    value: 300
                  },
                  {
                    name: "Nov. 2021",
                    value: 300
                  },
                  {
                    name: "Dec. 2021",
                    value: 390
                  },
                  {
                    name: "Jan 2022",
                    value: 305
                  },
                  {
                    name: "Fev 2022",
                    value: 330
                  },
                  {
                    name: "Avril 2022",
                    value: 320
                  },
                  {
                    name: "Mai 2022",
                    value: 300
                  }
                ]
                
              },
              stock_chart:{
                name: "Niveau Silo",
                series: [
                  {
                    name: "Jan 2021",
                    value: 78
                  },
                  {
                    name: "Fev 2021",
                    value: 35
                  },
                  {
                    name: "Mar 2021",
                    value: 97
                  },
                  {
                    name: "Avr 2021",
                    value: 46
                  },
                  {
                    name: "Mai 2021",
                    value: 87
                  },
                  {
                    name: "Juin 2021",
                    value: 78
                  },
                  {
                    name: "Juil. 2021",
                    value: 56
                  },
                  {
                    name: "Août 2021",
                    value: 87
                  },
                  {
                    name: "Sept. 2021",
                    value: 38
                  },
                  {
                    name: "Oct. 2021",
                    value: 98
                  },
                  {
                    name: "Nov. 2021",
                    value: 56
                  },
                  {
                    name: "Dec. 2021",
                    value: 90
                  },
                  {
                    name: "Jan 2022",
                    value: 100
                  },
                  {
                    name: "Fev 2022",
                    value: 40
                  },
                  {
                    name: "Avril 2022",
                    value: 50
                  },
                  {
                    name: "Mai 2022",
                    value: 30
                  }
                ]
                
              },
              temps_chart: {
                name: "Temps de Marche",
                series: [
                  {
                    name: "Jan 2021",
                    value: 2
                  },
                  {
                    name: "Fev 2021",
                    value: 3
                  },
                  {
                    name: "Mar 2021",
                    value: 6
                  },
                  {
                    name: "Avr 2021",
                    value: 10
                  },
                  {
                    name: "Mai 2021",
                    value: 20
                  },
                  {
                    name: "Juin 2021",
                    value: 5
                  },
                  {
                    name: "Juil. 2021",
                    value: 3
                  },
                  {
                    name: "Août 2021",
                    value: 1
                  },
                  {
                    name: "Sept. 2021",
                    value: 20
                  },
                  {
                    name: "Oct. 2021",
                    value: 16
                  },
                  {
                    name: "Nov. 2021",
                    value: 17
                  },
                  {
                    name: "Dec. 2021",
                    value: 20
                  },
                  {
                    name: "Jan 2022",
                    value: 24
                  },
                  {
                    name: "Fev 2022",
                    value: 16
                  },
                  {
                    name: "Mars 2022",
                    value: 20
                  },
                  {
                    name: "Avril 2022",
                    value: 16
                  }
                ]
              }
              },
        ],
        clients:[
          {
            name: "Hôtel Four Seasons"
          },
          {
            name: "Hôtel Rawabi"
          },
          {
            name: "Hôtel Agdal"
          },
        ]
      };
  }
  GetInfoBySite(id) {
    return this.http.get(this.URL + '/api/Dashboard/dashboard/site/' + id, {
      headers: this.headers
    });
  }
  GetListSite() {
    return this.http.get(this.URL + '/api/Dashboard/' + this.user.id_org, {
      headers: this.headers
    });
  }
}
