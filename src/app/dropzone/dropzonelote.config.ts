import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

export const DROPZONELOTE_CONFIG: DropzoneConfigInterface = {
  paramName: 'file',
  server: 'https://httpbin.org/post',
  maxFilesize: 50,
  maxFiles: 3,
  acceptedFiles: '.xls',
  dictDefaultMessage: `<span class="fa-stack fa-4x">
                        <i class="fa fa-square-o  fa-stack-2x"></i>
                        <i class="fa fa-file-excel-o" fa-stack-1x></i>
                      </span><br><br><h4>Arrastra tus archivo publicaciones aqui</h4>`,
  addRemoveLinks: true,
  dictRemoveFile: `Eliminar`,
  // previewsContainer: '#displayImage',
  // previewTemplate: `<div></div>`
};
