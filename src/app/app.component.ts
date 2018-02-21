import { Component } from '@angular/core';
import { Meliapi } from './services/melici.service';
import { BypassService } from './services/bypass/bypass.service';
import { AuthGuardMlService } from './services/auth-guard-ml/auth-guard-ml.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accessAll = <any>localStorage;

  constructor(private melici: Meliapi, private bypass: BypassService, private authService: AuthGuardMlService) {
    this.authService.reciveLogin().subscribe((res) => {
      if (!res) {
        swal('Oops...', 'Vincula tu cuenta de Mercadolibre!', 'error')
      }
    })
  }

  recieveData(event): void {

  }


}
