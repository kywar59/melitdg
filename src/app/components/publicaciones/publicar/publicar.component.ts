import { Component, OnInit, AfterViewInit, NgModule } from '@angular/core';
import { DateTimePickerModule } from 'ng-pick-datetime';

import { MeliService } from './../../../services/meli.service';
import { ImgurService } from './../../../services/imgur.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
@NgModule({
    imports: [ DateTimePickerModule ]
})
export class PublicarComponent implements OnInit {
  pictures: Array<Object>;
  programar = false;
  folder = 'images';
  c = {};
  item = {
    title: null,
    category_id: null,
    price: null,
    currency_id: 'VEF',
    available_quantity: null,
    buying_mode: null,
    listing_type_id: null,
    condition: null,
    description: '',
    pictures: [
      ]
  }
  descripcion_1 = '';
  listingTypes: Array<any>;

  froalaOp = {
    placeholderText: 'Para describir mejor tu producto usa la opcion FullScreen pulsando <i class="own-fullscreen"></i> en el menu.',
    events: {
      'froalaEditor.html.get': (e, editor, html) => {
       this.item.description = html;
      }
    }
  }

  constructor( private meli: MeliService, private imgur: ImgurService ) { }

  ngOnInit(): void {
    this.meli.getAvailableListingTypes().subscribe( (data) => {
      this.listingTypes = data.json().available;
    } )
  }

  onUploadSuccess(e) {
    console.log(e);
    // let urlimg = e[1].files.file;

    // this.imgur.uploadImg(urlimg)
    //     .subscribe( (res) => console.log(res.json()) );
  }

  putDescription1() {
    this.item.description = this.descripcion_1;
  }

  onProgramList(e) {
    return this.programar = !this.programar
  }

  publicarItem(formItem: any) {
    console.log(formItem.value);
    console.log(this.item);

    this.meli.listItem(this.item)
        .subscribe( (data) => console.log(data.json()) );
  }

  predictCategorie() {
    this.meli.categoryPredictor(this.item.title)
        .subscribe( (data) => {
          this.c = data.json();
          this.item.category_id = data.json().id;
        } );
  }

}
