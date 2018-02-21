import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
// import { SweetAlertService } from 'ng2-sweetalert2';
import swal from 'sweetalert2';

import { Subscription } from 'rxjs/Subscription';

import { ViewCell, LocalDataSource  } from './../../../../../node_modules/ng2-smart-table';

import { Meliapi } from './../../../services/melici.service';
import { MeliService } from './../../../services/meli.service';
import { MessageService } from './../../../services/message/message.service';
import { BypassService } from './../../../services/bypass/bypass.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { log } from 'util';
import { Logs, logging } from 'selenium-webdriver';

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-button-quest',
  template: `
    <a data-toggle="tooltip" *ngIf="rowData.status == 'UNANSWERED'" title="Responder" (click)="onReply()" data-target=".bd-example-modal-lg"><i class="fa fa-reply fa-lg" aria-hidden="true"></i></a>
    <a data-toggle="tooltip" *ngIf="rowData.status != 'ANSWERED'" title="Eliminar" (click)="onDelete()"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></a>
  `,
  styles: ['a { cursor: pointer; }']
})
export class ButtonQuestComponent implements ViewCell, OnInit {
  // @ViewChild('modalAnswers') modalAns: ElementRef;
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  closeResult: string;

  @Output() custom: EventEmitter<any> = new EventEmitter();

  options: NgbModalOptions = {
    size: 'lg',
    windowClass: 'animated fadeIn'
  };

  constructor(private meli: MeliService, private router: Router,
    private messageService: MessageService, public toastr: ToastsManager,
    vcr: ViewContainerRef, private modalService: NgbModal) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  onReply(content) {
    const modalRef = this.modalService.open(NgbdModalContentComponent, this.options);
    modalRef.componentInstance.data = this.rowData;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onDelete() {
    let msj = '';
    this.toastr.info('Eliminando Pregunta', 'Por favor espere...');
    this.meli.deleteQuestion(this.rowData.id).subscribe(res => {
      msj = res.json()[0];
      if (msj === 'Question deleted.' ) {
        this.messageService.sendMessageTrue();
        this.toastr.success('Se ha Eliminado la pregunta satisfactoriamente...');
      } else {
        this.messageService.sendMessageFalse();
        this.toastr.error('No se pudo eliminar la pregunta en estos momento, debido a una falla en el sistema', 'Intentelo mas tarde...');
      }
    });
  }

}
/************************************************************************************************** */
@Component({
  selector: 'app-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ data.nickname }} pregunta:</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="container">
          <div class="row">
              <div class="col-sm-6">
                  <p><i class="fa fa-comments-o fa-lg" aria-hidden="true"></i> {{ data.text }}</p>
                  <div class="form-group">
                      <label for="message-text" class="col-form-label">Respuesta:</label>
                      <textarea class="form-control" id="message-text" [(ngModel)]="answerTw" ></textarea>
                  </div>
                  <select class="custom-select" (change)="onChange($event)">
                      <option selected>Respuestas predeterminadas</option>
                      <option value="1">Por favor comuniquese al....</option>
                      <option value="2">No esta disponible...</option>
                      <option value="3">Si, oferte que cuidado</option>
                  </select>
              </div>
              <div class="col-sm-6">
                  <div class="row text-center">
                      <div class="col-sm-12">
                        <h4>Estado:</h4>
                        <h5><span class="badge badge-warning">Sin Responder</span></h5>
                      </div>
                      <div class="col-sm-12">
                        <h4 class="text-center">Fecha:</h4>
                        <p>{{ data.date_created | date:'yMdjm' }}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
      <pre>{{ answer | json }}</pre>
      <div class="modal-footer">
        <a class="btn btn-secondary" (click)="activeModal.close('Close click')">Cerrar</a>
        <a class="btn btn-primary" style="color:white" (click)="answerQuest()">Responder</a>
       <a class="btn btn-primary" style="color:white" (click)="answerQuest()">
          <i class="fa fa-reply-all fa-lg" aria-hidden="true"></i> Responder
        </a>
      </div>
  `,
  styles: ['a { cursor: pointer; }']
})
export class NgbdModalContentComponent {
  @Input() data;
  answerTw = '';
  answer = {
    question_id: null,
    text: ''
  };

  constructor(public activeModal: NgbActiveModal, private meli: MeliService, private router: Router,
    private messageService: MessageService, public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  answerQuest() {
    this.answer = {
      'question_id': this.data.id,
      'text': this.answerTw
    }

    this.meli.postAnswer(this.answer).subscribe(res => {
      console.log(res.json())
      if (res.json().status === 'ANSWERED') {
        this.toastr.success('Respuesta Publicada Satisfactoriamente...');
        this.messageService.sendMessageTrue();
        setTimeout(() => {
          this.activeModal.dismiss();
        }, 1000)
      } else {
        this.toastr.error('Hubo un error en responder la pregunta', 'Intentalo nuevamente...');
      }
    }, error => {
      console.log('Error: ', JSON.stringify(error));
    });

  }

  onChange (e) {
    this.answerTw = e.target.selectedOptions['0'].innerText;
  }

}
/************************************************************************************************* */
@Component({
  selector: 'app-modal-all-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Preguntas seleccionadas:</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="alert alert-warning" role="alert">
                Recuerda tener seleccionadas las preguntas correspondientes a la respuesta que elejiras.
              </div>
            </div>
          </div>
          <div class="row">
              <div class="col-sm-12">
                  <div class="form-group">
                      <label for="message-text" class="col-form-label">Respuesta:</label>
                      <textarea class="form-control" id="message-text" [(ngModel)]="answerTw" ></textarea>
                  </div>
                  <select class="custom-select" (change)="onChange($event)">
                      <option selected>Respuestas predeterminadas</option>
                      <option value="1">Por favor comuniquese al....</option>
                      <option value="2">No esta disponible...</option>
                      <option value="3">Si, oferte que cuidado</option>
                  </select>
              </div>
          </div>
          <hr>
        <div class="row">
          <div class="col-sm-12">
            <ng2-smart-table [settings]="settingTable" [source]="data"></ng2-smart-table>
          </div>
        </div>
      </div>
      </div>
      <pre>{{ data | json }}</pre>
      <div class="modal-footer">
        <a class="btn btn-secondary" (click)="activeModal.close('Close click')">Cerrar</a>
        <a class="btn btn-primary" style="color:white" (click)="loopQuest()">
          <i class="fa fa-reply-all fa-lg" aria-hidden="true"></i> Responder
        </a>
      </div>
  `,
  styles: ['a { cursor: pointer; }']
})
export class NgbdModalContentallComponent {

  @Input() data;
  answerTw = '';
  answer = {
    question_id: null,
    text: ''
  };

  settingTable = {
    noDataMessage: 'No se encontraron preguntas relacionadas a esta venta...',
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
      perPage: 7
    },
    columns: {
      text: {
        title: 'Pregunta',
        type: 'html',
        valuePrepareFunction: (text) => {
          return `<i class="fa fa-comments-o fa-lg" aria-hidden="true"></i> ${text}`;
        },
      },
      status: {
        title: 'Estatus',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Todas',
            list: [
              { value: 'UNANSWERED', title: 'Sin responder' },
              { value: 'ANSWERED', title: 'Respondidas' }
            ]
          }
        },
        valuePrepareFunction: (status) => {
          if (status === 'ANSWERED') {
            return '<span class="badge badge-success">Respondida</span>';
          } else if (status === 'UNANSWERED') {
            return '<span class="badge badge-warning">Sin responder</span>';
          }
        },
      },
      date_created: {
        title: 'Fecha',
        valuePrepareFunction: (date) => {
          const formatted = this.datePipe.transform(date, 'yMdjm');
          return formatted;
        }
      }
    }
  };

  constructor(public activeModal: NgbActiveModal, private meli: MeliService, private router: Router,
    private messageService: MessageService, public toastr: ToastsManager, vcr: ViewContainerRef, private datePipe: DatePipe) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  answerQuest(data, i) {
    this.answer = {
      'question_id': data.id,
      'text': this.answerTw
    }

    this.meli.postAnswer(this.answer).subscribe(res => {
      console.log(res.json())
      if (res.json().status === 'ANSWERED') {
        this.toastr.success(`Pregunta ${ i + 1 } respondida satisfactoriamente...`);
        return true;
      } else {
        this.toastr.error(`Hubo un error en responder la pregunta: ${ i + 1 }`, 'Intentalo nuevamente...');
        return false;
      }
    }, error => {
      console.log('Error: ', JSON.stringify(error));
    });

  }

  loopQuest() {
    let i = 0;
    let lenAns = this.data.length;
    let count = 0;
    let answer: boolean;

    do {
      if (this.answerQuest(this.data[i], i)) {
        i++;
      }else {
        count++;
        i = i;
        if (count === 2){
          i++;
        }
      }

    } while (i < lenAns);

    this.messageService.sendMessageTrue();
    setTimeout(() => {
      this.activeModal.dismiss();
    }, 1000)
  }

  onChange(e) {
    this.answerTw = e.target.selectedOptions['0'].innerText;
  }

}
/************************************************************************************************* */
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
  providers: [ButtonQuestComponent]
})
export class PreguntasComponent implements OnInit {

  questions = Array;
  idsItems = [];
  lenData = 0;
  items = <any>[];
  data = <any>[];
  source = <any>[];
  dataItems = [];
  rows = <any>[];
  show = false;
  message: any;
  subscription: Subscription;

  settingTable = {
    noDataMessage: 'No se encontraron preguntas relacionadas a esta venta...',
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
      perPage: 7
    },
    selectMode: 'multi',
    columns: {
      text: {
        title: 'Pregunta',
        type: 'html' ,
        valuePrepareFunction: (text) => {
          return `<i class="fa fa-comments-o fa-lg" aria-hidden="true"></i> ${text}`;
        },
      },
      nickname: {
        title: 'Usuario',
        type: 'html'
      },
      status: {
        title: 'Estatus',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Todas',
            list: [
              { value: 'UNANSWERED', title: 'Sin responder' },
              { value: 'ANSWERED', title: 'Respondidas' }
            ]
          }
        },
        valuePrepareFunction: (status) => {
          if (status === 'ANSWERED') {
            return '<span class="badge badge-success">Respondida</span>';
          } else if (status === 'UNANSWERED') {
            return '<span class="badge badge-warning">Sin responder</span>';
          }
        },
      },
      date_created: {
        title: 'Fecha',
        valuePrepareFunction: (date) => {
          const formatted = this.datePipe.transform(date, 'yMdjm');
          return formatted;
        }
      },
      id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonQuestComponent,
        filter: false
      }
    }
  };

  options: NgbModalOptions = {
    size: 'lg',
    windowClass: 'animated fadeIn'
  };

  constructor (private meli: MeliService, private router: Router,
    private messageService: MessageService, private datePipe: DatePipe,
    vcr: ViewContainerRef, private modalService: NgbModal, 
    private bypass: BypassService, public toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(vcr);
    this.getQuestionsList();

    this.subscription = this.messageService.getMessage()
      .subscribe(message => {
        this.message = message;
        if (this.message) {
          this.getQuestionsList();
        }
      });

        this.bypass.getLength()
        .subscribe(le => {
          console.log(le);
          this.lenData = le;
        })
  }

  ngOnInit() {

  }

  getQuestionsList () {
    this.meli.getIdListItems().subscribe(res => {
      this.idsItems = res.json().results
      this.meli.getListItems(this.idsItems).subscribe((data) => {
        // this.data.forEach(el => {
        //   el.title = `<a href="${el.permalink}" target="_blank">${el.title}</a>`;
        // });
        this.data = data.json().filter(el => {
          return el.status === 'active';
        })
        this.data.forEach((el, i) => {
          this.meli.questByItem(el.id).subscribe(resp => {
            el.questions = resp.json().questions;
            el.questions.forEach((ele, j) => {
              this.meli.getSeller(ele.from.id).subscribe(respt => {
                el.questions[j].nickname = respt.json().nickname;
              })
            });
          })
        })

        this.data.sort(this.setSortDesc);
        this.source = this.data;
        console.log(this.source);
      });
    });
  }

  selectedRows(e) {
    this.bypass.sendData(e);
  }

  postMultiAnswer() {
    this.rows = this.bypass.getData();
    let hasTo = false;

    this.rows.forEach(el => {
      if (el.status === 'ANSWERED') {
        hasTo = true;
      }
    });

    if (!hasTo) {
      const modalRef = this.modalService.open(NgbdModalContentallComponent, this.options);
      modalRef.componentInstance.data = this.rows;
    } else {
      this.toastr.error('No puede seleccionar preguntas ya respondidas...', 'Alerta');
    }

  }

  deleteMultiQuest(): void {
    swal({
        title: 'Esta seguro de eliminarlas?',
        text: 'No podra revertir este proceso luego!',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si <i class="fa fa-thumbs-up"></i>',
        cancelButtonText: 'No <i class="fa fa-thumbs-down"></i>',
      }).then((result) => {
        console.log(result);
        if (result) {
          this.loopDelete();
        }
      })
    
  }

  loopDelete() {
    const data = this.bypass.getData();
    let i = 0;
    let tries = 0;
    let lenAns = data.length;
    console.log(data);
    

    do {
      if (this.onDelete(data[i], i)) {
        i++;
      } else {
        tries++;
        i = i;
        if (tries === 2) {
          i++;
        }
      }

    } while (i < lenAns);
    
    swal(
      'Eliminadas!',
      'Tus preguntas han sido eliminadas.',
      'success'
    )

    this.messageService.sendMessageTrue();

  }

  onDelete(data, i) {
    let msj = '';

    this.toastr.info('Eliminando Pregunta', 'Por favor espere...');
    this.meli.deleteQuestion(data.id).subscribe(res => {
      msj = res.json()[0];
      if (msj === 'Question deleted.') {
        // this.messageService.sendMessageTrue();
        this.toastr.success('Se ha Eliminado la pregunta satisfactoriamente...');
        return true;
      } else {
        // this.messageService.sendMessageFalse();
        this.toastr.error('No se pudo eliminar la pregunta en estos momento, debido a una falla en el sistema', 'Intentelo mas tarde...');
        return false;
      }
    });
  }

  setSortDesc(a, b) {
    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
  }


}
