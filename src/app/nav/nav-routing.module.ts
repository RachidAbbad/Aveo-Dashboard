import { ImageComponent } from './../image/image.component';
import { AlertesComponent } from './../alertes/alertes.component';
import { ChaudiereDashbordComponent } from './../temp/chaudiere-dashbord.component';
import { AjouterIntComponent } from './../interventions/ajouter-int/ajouter-int.component';
import { CalendarComponent } from './../calendar/calendar.component';
import { AjouterComponent } from './../regles/ajouter/ajouter.component';
import { ReglesComponent } from './../regles/regles.component';
import { RapportsComponent } from './../interventions/rapports/rapports.component';
import { InterventionsComponent } from './../interventions/interventions.component';
import { AuthGuard } from './../services/auth-guard.service';
import { EtatMarcheComponent } from './../etat-marche/etat-marche.component';
import { AccessComponent } from './../access/access.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { NavComponent } from './nav.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    {
        path: 'home',
        component: NavComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'access',
                component: AccessComponent
            },
            {
                path: 'etatMarche',
                component: ChaudiereDashbordComponent /*EtatMarcheComponent*/
            },
            {
                path: 'interventions',
                component: InterventionsComponent
            },
            {
                path: 'rapports',
                component: RapportsComponent
            },
            {
                path: 'ajouter-regle',
                component: AjouterComponent
            },
            {
                path: 'regles',
                component: ReglesComponent
            },
            {
                path: 'calendrier',
                component: CalendarComponent
            },
            {
                path: 'ajouterIntervention',
                component: AjouterIntComponent
            },
            {
                path: 'alertes',
                component: AlertesComponent
            },
            {
                path: 'images',
                component: ImageComponent
            }
        ],
        canActivate: [AuthGuard]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavRoutingModule { }