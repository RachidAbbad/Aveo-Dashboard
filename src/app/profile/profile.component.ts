import { Component, NgModule, OnInit } from '@angular/core';
import { SitesService } from '../services/temp/sites.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {

  user:any;
  sites:Array<site> = new Array<site>();
  siteParent:site ;

  constructor(private ser:UserService, private ser_site:SitesService) { }

  ngOnInit(): void {
    this.user = this.ser.currentUser;
    this.getInfosSite(this.user.id_site);
  }

  getAcountType(){
    switch(this.user.type_user){
      case 1:
        return "Technicien";
      case 2:
        return "Supreviseur";
      case 3:
        return "Administrateur";
    }
  }

  getInfosSite(id_site:String){
    this.ser_site.getSiteById(id_site).subscribe((result:any)=>{
      console.log(result);

      var data = result.data;

      var main_site:site = {id:null, name:null, description:null};
      main_site.id = data.sites.id;
      main_site.name = data.sites.name;
      main_site.description = data.sites.description;
      this.sites.push(main_site);

      if(data.sites.site_id_parent){
        this.ser_site.getSiteById(data.sites.site_id_parent).subscribe((result:any)=>{
          this.siteParent = {id:null, name:null, description:null}
          this.siteParent.id = result.data.sites.id
          this.siteParent.name = result.data.sites.name
          this.siteParent.description = result.data.sites.description
        })
      }

      data.sous_sites.forEach(element => {
        var site:site = {id:null, name:null, description:null};
        site.id = element.sites.id;
        site.name = element.sites.name;
        site.description = element.sites.description;
        this.sites.push(site);
      });
    });
  }

}

interface site{
  id:string;
  name:string;
  description:string;
}