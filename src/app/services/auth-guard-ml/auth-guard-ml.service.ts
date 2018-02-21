import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthGuardMlService implements CanActivate, CanActivateChild {

  meliData = <any>[];
  private subject = new Subject<any>();

  constructor() {}

  canActivate() {
    if (localStorage.meli_access) {
      // this.meliData = JSON.parse(localStorage.meli_access);
      console.log('Pase adelante');
      this.subject.next(true);
      return true;
    } else {
      console.log('bloqueado por el guard');
      this.subject.next(false);
      return false;
    }
  }

  canActivateChild() {
    if (localStorage.meli_access) {
      // this.meliData = JSON.parse(localStorage.meli_access);
      console.log('Pase adelante');
      this.subject.next(true);
      return true;
    } else {
      console.log('hijo bloqueado por el guard');
      this.subject.next(false);
      return false;
    }
  }

  reciveLogin() {
    return this.subject.asObservable();
  }
}

