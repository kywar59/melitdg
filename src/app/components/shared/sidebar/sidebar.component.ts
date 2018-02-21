import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SweetAlertService } from 'ngx-sweetalert2';
import { Meliapi } from './../../../services/melici.service';
import { MeliService } from './../../../services/meli.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // @ViewChild('myModal') myModal: ElementRef;

  openBusqueda: boolean;
  openList: boolean;
  openQuest: boolean;

  constructor(
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private swal: SweetAlertService,
    private meliapi: Meliapi,
    private meliService: MeliService
  ) {
    this.openBusqueda = false;
    this.openList = false;
    this.openQuest = false;
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  showSuccess(e) {
    e.preventDefault();
    // this.swal.success({title: 'Hola'});
    // this.toastr.info('Prueba', 'Success!', { dismiss: 'auto', showCloseButton: true });


    // this.meliService.getProfile()
    //   .subscribe((res) => console.log(res));

    // $(this.myModal.nativeElement).modal('show');
  }

  onOpenBusqueda() {
   return this.openBusqueda = !this.openBusqueda;
  }

  onOpenList() {
    return this.openList = !this.openList;
  }

  onOpenQuest() {
    return this.openQuest = !this.openQuest;
  }
}
