import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Meliapi {
  base_url = 'https://localhost/ci/';

  constructor(private router: Router, private _http: Http) {}

  saludo() {
    const url = this.base_url + 'welcome/getAccess';

    return this._http.get(url).map((res: Response) => {
      return res;
    });
  }

  logout() {
    localStorage.removeItem('local_access');
    this.router.navigate(['/']);
  }

  getDataFromMeliapp() {
    const url = this.base_url + 'welcome/getDataFromDb';
    // localStorage.email = 'kywar59@gmail.com'; // eliminar al hacer la funcion de inicio de sesion
    // const body = { email: localStorage.email };
    return this._http.get(url).map((res: Response) => {
      return res;
    });
  }

  sendLoginToLocalapp(data) {
    const url = this.base_url + 'welcome/validateLocalLogin';
    const body = `correo=${data.email}&password=${data.password}`;
    const head = 'application/x-www-form-urlencoded';
    const options = new RequestOptions({ headers: new Headers({ 'Content-Type': head }) });
    // return this._http.post(url, body, options).toPromise().then((res: Response) => {
    //   return res;
    // })
    return this._http.post(url, body, options).map((res: Response) => {
      // console.log(res.json());
      return res;
    })
  }

  saveLoginLocalapp(data) {
    const url = this.base_url + 'welcome/getRegisterData'
    const body = `correo=${data.email}&password=${data.password}&nombre=${data.name}&apellido=${data.lastname}`
    const head = 'application/x-www-form-urlencoded';
    const options = new RequestOptions({ headers: new Headers({ 'Content-Type': head }) });
    return this._http.post(url, body, options).map((res: Response) => {
      // console.log(res.json());
      return res;
    })
  }
}
