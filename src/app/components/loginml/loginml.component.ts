import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeliService } from '../../services/meli.service';
import { Meliapi } from '../../services/melici.service';
import { BypassService } from '../../services/bypass/bypass.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loginml',
  templateUrl: './loginml.component.html',
  styleUrls: ['./loginml.component.css']
})
export class LoginmlComponent implements OnInit {

  subscription: Subscription;

  constructor(
    private meli: MeliService, private melici: Meliapi, private router: Router, private bypass: BypassService
  ) {
    console.log('loginml-noExisteToken');
    // if (!localStorage.local_access) {
    //   this.bypass.getLocalLogin().subscribe((resp) => {
    //     console.log(resp);
    //     this.melici.sendLoginToLocalapp(resp).subscribe(res => console.log(res.json()))
    //   });
    // }

    if (localStorage.meli_access) {
      console.log('loginml-existeToken');
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {}

  loginMl() {
    this.melici.getDataFromMeliapp().subscribe(res => {
      if (res.json() != '404') {
        localStorage.setItem('meli_access', JSON.stringify(res.json()));
        this.router.navigate(['/dashboard']);
        console.log('loginml-local');
      } else {
        this.meli.login();
        console.log('loginml-2');
      }
    });
  }
}
