import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeliService } from '../../services/meli.service';
import { Meliapi } from '../../services/melici.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  constructor(private meli: MeliService, private melici: Meliapi, private router: Router) {
    console.log('access');
   this.melici.getDataFromMeliapp()
      .subscribe((res) => {
        if (res.json() != '404') {
          localStorage.setItem('meli_access', JSON.stringify(res.json()));
          this.meli.setGlobalVars();
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
          console.log('access-obtenDataLocal');
        } else {
          this.router.navigate(['/loginml']);
          console.log('acess-noHayNada');
        }
      })

  }

  ngOnInit() {
  }

}
