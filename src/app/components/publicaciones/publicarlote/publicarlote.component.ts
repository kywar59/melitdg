import { Component, OnInit } from '@angular/core';

import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-publicarlote',
  templateUrl: './publicarlote.component.html',
  styleUrls: ['./publicarlote.component.css']
})
export class PublicarloteComponent implements OnInit {

  settingsDropzone: DropzoneConfigInterface = {
   paramName: 'file',
    server: 'https://httpbin.org/post',
    maxFilesize: 50,
    maxFiles: 3,
    acceptedFiles: '.xls',
    dictDefaultMessage: `<span class="fa-stack fa-4x">
                          <i class="fa fa-square-o  fa-stack-2x"></i>
                          <i class="fa fa-file-excel-o" fa-stack-1x></i>
                        </span><br><br><h4>Arrastra tus archivo de publicaciones aqui</h4>`,
    addRemoveLinks: true,
    dictRemoveFile: `Eliminar`,
  }

  constructor() { }

  ngOnInit() {
  }

  onUploadSuccess(e) {
    console.log(e);
  }



}
