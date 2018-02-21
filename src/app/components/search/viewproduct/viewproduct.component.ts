import { Component, OnInit, AfterViewChecked, AfterContentInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeliService } from './../../../services/meli.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit, AfterViewChecked, AfterContentInit, AfterViewInit {

  id: string;
  product = {}
  pictures = {};

  constructor(
    private meli: MeliService, private activatedRoute: ActivatedRoute
  ) {  }

  ngAfterViewChecked() {
    console.log('Vista Chequeada');
  }

  ngAfterContentInit() {
    console.log('Vista Iniciada');
  }

  ngAfterViewInit() {
      $( document ).ready(function() {
        console.log("jQuery is ready");
      });
  }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      this.meli.getProduct(this.id).subscribe( data => {
        this.product = data.json();
        this.pictures = data.json().pictures;
        console.log(this.product);

        setTimeout(function() {
          console.log("jQuery is ready");
        }, 1500);

      } )
    } );
  }

}

