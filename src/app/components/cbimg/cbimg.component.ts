import { Component, OnInit } from '@angular/core';
import { ImgurService } from './../../services/imgur.service';


@Component({
  selector: 'app-cbimg',
  templateUrl: './cbimg.component.html',
  styleUrls: ['./cbimg.component.css']
})
export class CbimgComponent implements OnInit {

  constructor( private imgur: ImgurService) { }

  ngOnInit() {
    this.imgur.getToken();
  }
}
