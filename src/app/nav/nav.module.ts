import { ImageComponent } from './../image/image.component';
import { AlertesComponent } from './../alertes/alertes.component';
import { SitesService } from './../services/temp/sites.service';
import { ConsommationService } from './../services/temp/consommation.service';
import { CompteurService } from './../services/temp/compteur.service';
import { ChaudiereDashbordComponent } from './../temp/chaudiere-dashbord.component';
import { SafeHtmlPipe } from './../interventions/rapports/safe-html.pipe';
import { EtatMarcheService } from './../services/etat-marche.service';
import { AccessService } from './../services/access.service';
import { RegleService } from './../services/regle.service';
import { NotificationService } from './../services/notification.service';
import { InterventionService } from './../services/intervention.service';
import { DashboardService } from './../services/dashboard.service';
import { AjOutilsComponent } from './../interventions/ajouter-int/mode-op/aj-outils/aj-outils.component';
import { ModeOpComponent } from './../interventions/ajouter-int/mode-op/mode-op.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AjouterIntComponent } from './../interventions/ajouter-int/ajouter-int.component';
import { CalendarComponent } from './../calendar/calendar.component';
import { ShowRapportComponent } from './../interventions/rapports/show-rapport/show-rapport.component';
import { AjouterComponent } from './../regles/ajouter/ajouter.component';
import { ReglesComponent } from './../regles/regles.component';
import { RapportsComponent } from './../interventions/rapports/rapports.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InterventionsComponent } from './../interventions/interventions.component';
import { UserService } from './../services/user.service';
import { ListAccessComponent } from './../list-access/list-access.component';
import { MatListModule } from '@angular/material/list';
import { EtatMarcheComponent } from './../etat-marche/etat-marche.component';
import { AccessComponent } from './../access/access.component';
import { ParametresComponent } from './../parametres/parametres.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { NavRoutingModule } from './nav-routing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatSelectModule} from '@angular/material/select';
import { AjConditionComponent } from '../regles/ajouter/aj-condition/aj-condition.component';
import { AjActionComponent } from '../regles/ajouter/aj-action/aj-action.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSliderModule} from '@angular/material/slider';
 // must go before plugins
import dayGridPlugin  from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { QuillModule } from 'ngx-quill';
import { AjMaterielComponent } from '../interventions/ajouter-int/mode-op/aj-materiel/aj-materiel.component';
import { AjActionsComponent } from '../interventions/ajouter-int/mode-op/aj-actions/aj-actions.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    DashboardComponent,
    ParametresComponent,
    AccessComponent,
    EtatMarcheComponent,
    ListAccessComponent,
    InterventionsComponent,
    RapportsComponent,
    AjouterComponent,
    ReglesComponent,
    AjConditionComponent,
    AjActionComponent,
    ShowRapportComponent,
    CalendarComponent,
    AjouterIntComponent,
    ModeOpComponent,
    AjOutilsComponent,
    AjMaterielComponent,
    AjActionsComponent,
    SafeHtmlPipe,
    ChaudiereDashbordComponent,
    AlertesComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    NavRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    FontAwesomeModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatRippleModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatInputModule,
    FullCalendarModule,
    MatStepperModule,
    QuillModule.forRoot(),
    MatSlideToggleModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    UserService,
    DashboardService,
    InterventionService,
    NotificationService,
    RegleService,
    AccessService,
    EtatMarcheService,
    CompteurService,
    ConsommationService,
    SitesService,
    DatePipe,

    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class NavModule { }
