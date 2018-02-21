import { Component, OnInit } from '@angular/core';
import { MeliService } from './../../services/meli.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private meli: MeliService) { }

  ngOnInit() {
    this.meli.setSession();
  }

}
