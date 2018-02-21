import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

export const DROPZONE_CONFIG: DropzoneConfigInterface = {
  paramName: 'file',
  server: 'https://httpbin.org/post',
  method: 'post',
  headers: {
    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    'Authorization': 'Client-ID a867bb291ca25d3'
  },
  maxFilesize: 50,
  maxFiles: 3,
  acceptedFiles: 'image/jpg, image/png, image/gif, image/jpeg ',
  dictDefaultMessage: `<span class="fa-stack fa-4x">
                        <i class="fa fa-square-o  fa-stack-2x"></i>
                        <i class="fa fa-file-image-o fa-stack-1x"></i>
                      </span><br><br><h4>Arrastra tus imagenes aqui</h4>`,
  addRemoveLinks: true,
  dictRemoveFile: `Eliminar`,
  // previewsContainer: '#displayImage',
  // previewTemplate: `<div></div>`
};
