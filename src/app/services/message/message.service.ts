import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  constructor() { }

  private subject = new Subject<any>();

  sendMessageTrue() {
    this.subject.next(true);
  }
  sendMessageFalse() {
    this.subject.next(false);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
