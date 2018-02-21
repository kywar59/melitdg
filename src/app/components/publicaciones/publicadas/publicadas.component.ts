import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';

import { MeliService } from './../../../services/meli.service';
import { MessageService } from './../../../services/message/message.service';

import { ViewCell, LocalDataSource } from './../../../../../node_modules/ng2-smart-table';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-button-view',
  template: `
      <a *ngIf="rowData.status == 'paused'" data-toggle="tooltip" title="Activar venta" (click)="onPlay()"><i class="fa fa-play-circle-o fa-lg" aria-hidden="true"></i></a>
      <a *ngIf="rowData.status == 'active'" data-toggle="tooltip" title="Pausar venta" (click)="onPause()"><i class="fa fa-pause-circle-o fa-lg" aria-hidden="true"></i></a>
      <a *ngIf="rowData.status == 'closed'" data-toggle="tooltip" title="Republicar Item" (click)="onReList()"><i class="fa fa-refresh fa-lg" aria-hidden="true"></i></a>
      <a data-toggle="tooltip" title="Editar venta" (click)="onEdit()"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a>
      <a *ngIf="rowData.status != 'closed'" data-toggle="tooltip" title="Cerrar venta" (click)="onClose()"><i class="fa fa-times-circle-o fa-lg" aria-hidden="true"></i></a>
      <a *ngIf="rowData.status == 'closed'" data-toggle="tooltip" title="Eliminar venta" (click)="onClick()"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></a>
  `,
  styles: ['a { cursor: pointer; }']
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;


  @Output() custom: EventEmitter<any> = new EventEmitter();

  constructor(private meli: MeliService, private router: Router, private messageService: MessageService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip()
  }

  onClick() {
    this.custom.emit(this.rowData);
    console.log(this.rowData);
  }

  onPlay() {
    this.toastr.info('Activando publicacion', 'Procesando...');
    this.meli.playItem(this.rowData.id).subscribe((data) => {
      const status = data.json().status;
      console.log(status);
      if (status === 'active') {
        this.messageService.sendMessageTrue();
        this.toastr.success('Publicacion Activada Satisfactoriamente...');
      } else {
        this.messageService.sendMessageFalse();
        this.toastr.error('No se pudo activar en estos momentos, debido a una falla en el sistema', 'Intentelo mas tarde...');
      }
    });
  }

  onPause() {
    this.toastr.info('Pausando publicacion', 'Procesando...');
    this.meli.pauseItem(this.rowData.id).subscribe( (data) => {
      const status = data.json().status;
      console.log(status);
      if (status === 'paused') {
        this.messageService.sendMessageTrue();
        this.toastr.success('Publicacion Pausada Satisfactoriamente...');
      }else {
        this.messageService.sendMessageFalse();
        this.toastr.error('No se pudo pausar en estos momentos, debido a una falla en el sistema', 'Intentelo mas tarde...');
      }
    } );
  }

  onClose() {
    this.toastr.info('Cerrando publicacion', 'Procesando...');
    this.meli.closeItem(this.rowData.id).subscribe((data) => {
      const status = data.json().status;
      console.log(status);
      if (status === 'closed') {
        this.messageService.sendMessageTrue();
        this.toastr.success('Publicacion Cerrada Satisfactoriamente...');
      } else {
        this.messageService.sendMessageFalse();
        this.toastr.error('No se pudo cerrar en estos momentos, debido a una falla en el sistema', 'Intentelo mas tarde...');
      }
    });
  }

  onEdit() {

  }

  onDelete() {

  }

  onReList() {
    this.toastr.info('Republicando Item', 'Por favor espere...');
    this.meli.relistItem( this.rowData ).subscribe( data => {
      const status = data.json().status;
      console.log(status);
      if (status === 'not_yet_active') {
        this.messageService.sendMessageTrue();
        this.toastr.success('Se ha Republicado el Item Satisfactoriamente...', 'Nota: Puede demorar unos minutos para que logres ver tu Item totalmente activo en el Site');
      }else {
        this.messageService.sendMessageFalse();
        this.toastr.error('No se pudo cerrar en estos momentos, debido a una falla en el sistema', 'Intentelo mas tarde...');
      }
    })
  }

 }


@Component({
  selector: 'app-publicadas',
  templateUrl: './publicadas.component.html',
  styleUrls: ['./publicadas.component.css'],
  providers: [DecimalPipe, ButtonViewComponent]
})
export class PublicadasComponent implements OnInit {

  idsItems = [];
  data = [];
  source: LocalDataSource;
  message: any;
  subscription: Subscription;

  settingTable = {
    noDataMessage: 'No se encontraron publicaciones...',
    attr: {
      class: 'table-hover table-sm'
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      secure_thumbnail: {
        title: 'Minuatura',
        type: 'html',
        filter: false,
        valuePrepareFunction: (thumbnail) => {
          let formatted = `<img width="75" height="75" src="${ thumbnail }" alt="">`;
          return formatted;
        }
      },
      title: {
        title: 'Titulo',
        type: 'html'
      },
      price: {
        title: 'Precio',
        width: '30px',
        valuePrepareFunction: (price) => {
          let formatted = this.decimal.transform(price, '.2-2');
          return formatted;
        }
      },
      initial_quantity: {
        title: 'Cantidad Inicial',
        width: '20px'
      },
      available_quantity: {
        title: 'Cantidad Disponible',
        width: '20px'
      },
      status: {
        title: 'Estatus',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Todas',
            list: [
              { value: 'active', title: 'Activas' },
              { value: 'paused', title: 'Pausadas' },
              { value: 'closed', title: 'Cerradas' },
            ]
          }
        },
        valuePrepareFunction: (status) => {
          if (status === 'active') {
            return '<span class="badge badge-success">Activa</span>';
          }else if (status === 'paused') {
            return '<span class="badge badge-warning">Pausada</span>';
          }else if (status === 'closed') {
            return '<span class="badge badge-danger">Cerrada</span>';
          }
        }
      },
      id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        filter: false
      },
    }
  };

  constructor(private meli: MeliService, private router: Router, public decimal: DecimalPipe, private messageService: MessageService) { 
    this.getListado();
    
    this.subscription = this.messageService.getMessage()
        .subscribe(message => {
          this.message = message;
          if (this.message) {
            this.getListado();
          }
        });

    this.meli.getViewsMonth();
  }

  ngOnInit() { }

  getListado() {
    this.meli.getIdListItems().subscribe( (res) => {
      this.idsItems = res.json().results.toString();
      this.meli.getListItems(this.idsItems).subscribe( (data) => {
        this.data = data.json();
        this.data.forEach(el => {
          el.title = `<a href="${ el.permalink }" target="_blank">${ el.title }</a>`;
        });
        this.source = new LocalDataSource(this.data);
        this.source = this.source.setSort([{ field: 'start_time', direction: 'desc' }])
      });
    } )
  }

}
