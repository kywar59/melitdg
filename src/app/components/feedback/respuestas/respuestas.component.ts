import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
// import { SweetAlertService } from 'ng2-sweetalert2';
import swal from 'sweetalert2';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Subscription } from 'rxjs/Subscription';

import { ViewCell, LocalDataSource } from './../../../../../node_modules/ng2-smart-table';

import { Meliapi } from './../../../services/melici.service';
import { MeliService } from './../../../services/meli.service';
import { MessageService } from './../../../services/message/message.service';
import { BypassService } from './../../../services/bypass/bypass.service';
import { log } from 'util';

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {

  constructor(private meliApi: Meliapi) { }

  ngOnInit() {
  }

  addAnswer() {
    this.meliApi.saludo()
      .subscribe((res) => console.log(res));
  }

}
