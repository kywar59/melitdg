import { Component, OnInit } from '@angular/core';
import { MeliService } from './../../../services/meli.service';
import { Meliapi } from './../../../services/melici.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profile = <any>{}
  local_access;

  constructor(private meli: MeliService, private melici: Meliapi) {
    if (localStorage.local_access) {
      this.local_access = JSON.parse(localStorage.local_access);
      this.profile = {
        nombre: `${this.local_access.nombre} ${this.local_access.apellido}`,
        pic_profile: this.local_access.picture,
        correo: this.local_access.correo
      }
    }
  }

  ngOnInit() {
  }

  loginMl() {

  }

  logoutMeliapp() {
    this.melici.logout();
    this.meli.logout();
  }

}
