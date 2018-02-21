import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { log } from 'util';
import { Meliapi } from './../melici.service';

@Injectable()
export class BypassService {
  private headerSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private subject = new Subject<any>();
  public data = [];

  constructor(private melici: Meliapi) {}

  // sendData(data) {
  //     this.subject.next(data);
  // }

  // getData(): Observable<any> {
  //     return this.subject.asObservable();
  // }
  sendData(data) {
    let pos = 0;
    let elem = null;

    if (data.isSelected === true) {
      data.selected.forEach(el => {
        if (!this.data.includes(el)) {
          this.data.push(el);
        }
      });
    } else if (data.isSelected === false) {
      elem = data.data;
      pos = this.data.indexOf(elem);

      this.data.splice(pos, 1);
    }
    console.log(this.data);
    this.subject.next(this.data.length);
  }

  getData() {
    return this.data;
  }

  getLength() {
    return this.subject.asObservable();
  }

  getSendDataLoginLocal(data) {
    // console.log(data);
    this.subject.next(data);
  }

  getLocalLogin() {
    return this.subject.asObservable();
  }
}
