import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, ResponseContentType, RequestOptions, RequestOptionsArgs, Headers, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImgurService {
  BASE64_MARKER = ';base64,';

  client_id = 'a867bb291ca25d3';
  access_token = '5fcdc729467e034c36ffcf642fca208a3e11c9b2';

  constructor(private router: Router, private http: Http) { }

  loginImg() {
    window.location.href = `https://api.imgur.com/oauth2/authorize?client_id=${ this.client_id }&response_type=token`;
  }

  uploadImg(base64Img) {
    const path = 'https://api.imgur.com/3/image.json';

    let img = base64Img.split(',')[1];
    // console.log(img);
    
    const header = new Headers();
    header.append('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
    header.append('Authorization', 'Client-ID ' + this.client_id);

    const options = new RequestOptions({ headers: header });

    return this.http.post(path, {'image': img}, options).map( (res: Response) => res );
  }

  getToken() {
    let hash = window.location.hash
    let hashParts = hash.slice(1).split('&');

    hashParts.forEach( (element, i) => {
      let part = element.split('=');
      if (part[0] === 'access_token') {
        part[0] = 'tokenImgur';
      }
      localStorage.setItem(part[0], part[1]);
    })

    this.router.navigate(['/publicaciones']);
  }

  private convertDataURIToBinary(dataURI) {
    let base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    let base64 = dataURI.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

}
