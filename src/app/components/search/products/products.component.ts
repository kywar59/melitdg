import { Component, OnInit } from '@angular/core';
import { MeliService } from './../../../services/meli.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  termino: string;

  products = {};
  categories = {};

  constructor(
    private meli: MeliService
  ) { }

  ngOnInit() {
  }

  public getProducts() {
    this.meli.getProducts(this.termino)
      .subscribe( (data) => {
        this.products = data.json().results;
        console.log(data.json());
      } )
  }
}
