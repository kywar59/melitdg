import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Http, Response, RequestOptionsArgs, RequestOptions, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Console } from 'ngx-sweetalert2/node_modules/@angular/core/src/console';

@Injectable()
export class MeliService {
  // appID = '3808801410491585';
  appID = '7829144348451884';
  base_url = 'https://api.mercadolibre.com/';
  meliData = <any>[];
  access_token;
  user_id;
  headers: Headers = new Headers();
  opt: RequestOptionsArgs;

  date = new Date();
  date_from = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  date_to = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  constructor(
    private router: Router,
    private _http: Http,
    private datePipe: DatePipe
  ) {
    // this.setGlobalVars();
  }

  public login() {
    window.location.href = 'https://auth.mercadolibre.com.ve/authorization?response_type=token&client_id=' + this.appID;
    // const url = 'https://auth.mercadolibre.com.ve/authorization?response_type=token&client_id=' + this.appID ;
    // window.open(url, 'MeliApp', 'width=300, height=200')
  }

  public setGlobalVars() {
    if (localStorage.meli_access) {
      this.meliData = JSON.parse(localStorage.meli_access);
      this.access_token = this.meliData.access_token;
      this.user_id = parseInt(this.meliData.id_meli);
      console.log(this.meliData);
    }
  }

  public setSession(): void {
    let hash = window.location.hash;
    let hashParts = hash.slice(1).split('&');

    hashParts.forEach((element, i) => {
      const part = element.split('=');
      localStorage.setItem(part[0], part[1]);
    });

    this.router.navigate(['/dashboard']);
  }

  /*Moodificar funcion de logout del localstorage*/

  public logout(): void {
    localStorage.removeItem('meli_access');
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // e.preventDefault();

    if (localStorage.getItem('expires_in')) {
      const expires_in = JSON.parse(localStorage.getItem('expires_in'));
      const date = new Date();
      const dateTime = date.getTime();

      return true;
    } else {
      return false;
    }
  }

  public getProfile() {
    const path =
      this.base_url + `users/${this.user_id}?access_token=${this.access_token}`;

    return this._http.get(path).map((res: Response) => {
      return res.json();
    });
  }

  public getProducts(val: string) {
    const path = this.base_url + `sites/MLV/search?q=${val}`;

    return this._http.get(path).map((res: Response) => {
      return res;
    });
  }

  public getProduct(val: string) {
    const path =
      this.base_url + `items/${val}?access_token=${this.access_token}`;

    return this._http.get(path).map((res: Response) => {
      return res;
    });
  }

  public getListingTypes() {
    const path = this.base_url + `sites/MLV/listing_types`;

    return this._http.get(path).map((res: Response) => {
      return res;
    });
  }
  public getCategories() {
    const path = this.base_url + `sites/MLV`;

    return this._http.get(path).map((res: Response) => {
      return res.json().categories;
    });
  }

  public listItem(item) {
    const path = this.base_url + `items?access_token=${this.access_token}`;

    return this._http.post(path, item).map((res: Response) => {
      return res;
    });
  }

  public categoryPredictor(title) {
    const path =
      this.base_url + `sites/MLV/category_predictor/predict?title=${title}`;

    return this._http.get(path).map((res: Response) => {
      return res;
    });
  }

  public uploadImg(url) {
    const path = this.base_url + `pictures?access_token=${this.access_token}`;

    return this._http.post(path, url).map((res: Response) => res);
  }

  public getAvailableListingTypes() {
    const path =
      this.base_url +
      `users/${this.user_id}/available_listing_types?access_token=${
        this.access_token
      }`;

    return this._http.get(path).map((res: Response) => res);
  }

  public getIdListItems() {
    const path =
      this.base_url +
      `users/${this.user_id}/items/search?access_token=${this.access_token}`;

    return this._http.get(path).map((res: Response) => res);
  }

  public getListItems(items) {
    const path =
      this.base_url +
      `items?ids=${items}&attributes=id,title,seller_id,price,available_quantity,status,secure_thumbnail,initial_quantity,available_quantity,permalink,start_time,listing_type_id`;

    return this._http.get(path).map((res: Response) => res);
  }

  public getViewsMonth() {
    const date_from = this.datePipe.transform(this.date_from, 'y-MM-dd');
    const date_to = this.datePipe.transform(this.date_to, 'y-MM-dd');
    const path =
      this.base_url +
      `users/${
        this.user_id
      }/items_visits?date_from=${date_from}T00:00:00.000-00:00&date_to=${date_to}T00:00:00.000-00:00`;

    return this._http.get(path).map((res: Response) => res);
  }

  public getQuestionsMonth() {
    const date_from = this.datePipe.transform(this.date_from, 'y-MM-dd');
    const date_to = this.datePipe.transform(this.date_to, 'y-MM-dd');
    const path =
      this.base_url +
      `users/${
        this.user_id
      }/contacts/questions?date_from=${date_from}&date_to=${date_to}`;

    return this._http.get(path).map((res: Response) => res);
  }

  public playItem(item) {
    const body = { status: 'active' };
    const path =
      this.base_url + `items/${item}?access_token=${this.access_token}`;

    return this._http.put(path, body).map((res: Response) => res);
  }

  public pauseItem(item) {
    const body = { status: 'paused' };
    const path =
      this.base_url + `items/${item}?access_token=${this.access_token}`;

    return this._http.put(path, body).map((res: Response) => res);
  }

  public closeItem(item) {
    const body = { status: 'closed' };
    const path =
      this.base_url + `items/${item}?access_token=${this.access_token}`;

    return this._http.put(path, body).map((res: Response) => res);
  }

  public relistItem(data) {
    const path =
      this.base_url +
      `items/${data.id}/relist?access_token=${this.access_token}`;
    const body = {
      price: data.price,
      quantity: data.available_quantity,
      listing_type_id: data.listing_type_id
    };

    return this._http.post(path, body).map((res: Response) => res);
  }

  public paidOrders() {
    const path =
      this.base_url +
      `orders/search?seller=${
        this.user_id
      }&order.status=paid&sort=date_desc&access_token=${this.access_token}`;

    return this._http.get(path).map((res: Response) => res);
  }

  public recivedQuestions() {
    const path =
      this.base_url +
      `my/received_questions/search?access_token=${this.access_token}`;

    return this._http.get(path).map((res: Response) => res);
  }

  public questByItem(item) {
    const path =
      this.base_url +
      `questions/search?item=${item}&access_token=${this.access_token}`;

    return this._http.get(path).map((res: Response) => res);
  }

  public getSeller(seller_id) {
    const path =
      this.base_url + `users/${seller_id}?access_token=${this.access_token}`;

    return this._http.get(path).map((res: Response) => res);
  }

  postAnswer(answer) {
    const path = this.base_url + `answers?access_token=${this.access_token}`;
    const body = JSON.stringify(answer);
    this.headers.append('Accept', 'application/json');
    let opt = new RequestOptions({ headers: this.headers });

    return this._http.post(path, body, opt).map((res: Response) => res);
  }

  deleteQuestion(id) {
    const path =
      this.base_url + `questions/${id}?access_token=${this.access_token}`;

    return this._http.delete(path).map((res: Response) => res);
  }
}
