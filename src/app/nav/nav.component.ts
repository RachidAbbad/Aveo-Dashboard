import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './../services/notification.service';
import { UserService } from './../services/user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { faCompass, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faTachometerAlt, faCalculator, faUser, faUserAlt, faChevronRight, faChevronLeft, faBars, faBell, faCogs, faSignOutAlt, faSearch, faTh, faThList, faThermometer, faThermometerEmpty, faLayerGroup, faThermometerHalf, faSun, faChartPie, faFolder, faLightbulb, faWrench, faHardHat, faCubes, faHouseUser, faGavel, faUserClock, faUserCog, faUsers, faImage } from '@fortawesome/free-solid-svg-icons';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements  OnInit{
  filmIcon = faTachometerAlt;
  degreePlanIcon = faCompass;
  calculatorIcon = faCalculator;
  calendarIcon = faCalendarAlt;
  userIcon = faUser;
  userAltIcon = faUserAlt;
  chevronOneIcon = faChevronRight;
  chevronTwoIcon = faChevronLeft;
  barsIcon = faBars;
  bellIcon = faBell;
  cogsIcon = faCogs;
  signOutIcon = faSignOutAlt;
  SearchIcon = faSearch;
  GridIcon = faTh;
  ListIcon = faThList;


  isCollapsed = false;
  isAlertsClicked = false;
  isProfileClicked = false;
  isSwitch = true;
  Name;
  ImageURL = './assets/avatar.png';
  notifications = [];
  widgets = [
    {icon: faThermometerHalf, title: "Temperature"},
    {icon: faLayerGroup, title: "Humidité"},
    {icon: faSun, title: "Méteo"},
    {icon: faChartPie, title: "Analytic"},
    {icon: faFolder, title: "Documents"},
    {icon: faLayerGroup, title: "Pages"},
    {icon: faLightbulb, title: "Electricité"},
    {icon: faCalendarAlt, title: "Calendrier"},
  ];
  menus = [
    {icon: faTachometerAlt, title: "Dashboard", routerLink: "/home/dashboard"},
    {icon: faWrench, title: "Etat de Marche", routerLink: "/home/etatMarche"},
    {id: "list", icon: faHardHat, title: "Interventions", routerLink: "/home/interventions", collapse: true, subItems: [
      {title: "Listes des interventions", routerLink: "/home/interventions"},
      {title: "Ajouter des interventions", routerLink: "/home/ajouterIntervention"},
      {title: "Rapports", routerLink: "/home/rapports"},
      {title: "Calendrier", routerLink: "/home/calendrier"},
    ]},
    // {id: "list2",icon: faCubes, title: "Park Objet", routerLink: "/home/dashboard", collapse: true, subItems: [
    //   {title: "Listes des Objets", routerLink: "/home/dashboard"},
    //   {title: "Ajouter des Objets", routerLink: "/home/dashboard"},
    //   {title: "Exporter la structure", routerLink: "/home/dashboard"},
    // ]},
    // {icon: faHouseUser, title: "Gestion Des Clients", routerLink: "/home/dashboard"},
    {icon: faGavel, title: "Régles", routerLink: "/home/regles"},
    {icon: faUserClock, title: "Accès", routerLink: "/home/access"},
    {icon: faBell, title: "Alertes", routerLink: "/home/alertes"},
    {icon: faImage, title: "Images", routerLink: "/home/images"},
    // {icon: faUserCog, title: "Utilisateurs", routerLink: "/home/dashboard"},
    // {icon: faUsers, title: "Equipes", routerLink: "/home/dashboard"},
  ];
  constructor( private ser: UserService, private notif_ser: NotificationService, private router: Router) {
    this.Name = ser.currentUser.prenom +' '+ ser.currentUser.name;
  }
  ngOnInit(){
    this.getNotification();
    setInterval(() => this.getNotification(), 60*1000);
  }
  getNotification(){
    this.notif_ser.getNotification().subscribe((result: any) => {
      this.notifications = result.data;
    });
  }
  hidden(){
    if (this.notifications.length == 0)
    return true;
    else 
    return false;
  }
  logout(){
    this.ser.logout();
  }
  // @HostListener('window:beforeunload')
  // ngOnDestroy(){
  //   localStorage.clear();
  // }
  collapse(){
    this.isCollapsed = !this.isCollapsed;
  }
  switch(){
    this.isSwitch = !this.isSwitch;
  }
  alertClick(){
    this.isAlertsClicked = !this.isAlertsClicked;
  }
  profileClick(){
    this.isProfileClicked = !this.isProfileClicked;
  }

  navigateToProfile(){
    this.router.navigate(['/home/profile']);
  }

  drop(event: CdkDragDrop<string[]>) {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //                     event.container.data,
    //                     event.previousIndex,
    //                     event.currentIndex);
    // }
  }
}
