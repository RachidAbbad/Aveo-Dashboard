import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  download = faDownload;

  constructor(private service: ImagesService, private router: Router) { 

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    setInterval(()=>{
      this.router.navigate(['/home/images']);
    }, 10000);
  }
  

}
