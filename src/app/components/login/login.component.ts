import { Component, OnInit, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { MeliService } from './../../services/meli.service';
import { Meliapi } from './../../services/melici.service';
import { BypassService } from '../../services/bypass/bypass.service';

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() sendLogin = new EventEmitter();

  public form: FormGroup;
  public formRegister: FormGroup;
  public name: AbstractControl;
  public lastname: AbstractControl;
  public email: AbstractControl;
  public email_reg: AbstractControl;
  public password: AbstractControl;
  public password_reg: AbstractControl;
  public showLogin: boolean;
  public showReg: boolean;

  constructor(
    fb: FormBuilder, fb2: FormBuilder, public toastr: ToastsManager, vcr: ViewContainerRef,
    private meliService: MeliService, private melici: Meliapi, private bypass: BypassService, private router: Router) {
    this.showLogin = true;
    this.showReg = false;
    this.toastr.setRootViewContainerRef(vcr);

    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.formRegister = fb2.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

    this.name = this.formRegister.controls['name'];
    this.lastname = this.formRegister.controls['lastname'];
    this.email_reg = this.formRegister.controls['email'];
    this.password_reg = this.formRegister.controls['password'];

  }

  ngOnInit() {}

  loginClick(values: Object) {
    this.toastr.info('Por favor espere...', 'Verificando credenciales');
    if (this.form.valid) {
      this.melici.sendLoginToLocalapp(values).subscribe((res) => {
        console.log(res.json())
        if (res.json() != 404) {
          this.toastr.success('Accediendo...', 'Credenciales correctos');
          $('form').fadeOut(500);
          $('.wrapper').addClass('form-success').fadeOut(1000);
          setTimeout(() => {
            localStorage.local_access = JSON.stringify(res.json());
            this.router.navigate(['loginml']);
          }, 1500);
        } else {
          this.toastr.warning('Por favor revise nuevamente...', 'Credenciales incorrectos');
        }
      });

      // this.sendLogin.emit(true);
      // $('form').fadeOut(500);
      // $('.wrapper').addClass('form-success').fadeOut(1000);
    } else {
      this.toastr.warning('Por favor revise nuevamente...', 'Campos invalidos');
    }
  }

  registerClick(values: Object) {
    this.toastr.info('Por favor espere...', 'Guardando credenciales');
    if (this.formRegister.valid) {
      console.log(values);
      this.melici.saveLoginLocalapp(values).subscribe((res) => {
        console.log(res.json());
        if (res.json() == 200) {
          this.toastr.success('Listo para iniciar sesion', 'Guardados Exitosamente')
          this.showReg = !this.showReg;
          this.showLogin = !this.showLogin;
          this.formRegister.reset();
        }else if (res.json() == 505) {
          this.toastr.error('Intentelo nuevamente...', 'Este usuario ya existe')
        }else if (res.json() == 500) {
          this.toastr.error('Intentelo nuevamente...', 'Error al guardar credenciales')
        }else if (res.json() == 404) {
          console.log('no se encontro dato');
        }
      })
    } else {
      this.toastr.warning('Por favor revise nuevamente...', 'Campos invalidos');
    }
  }

  showRegister() {
    // console.log('register');
    this.showReg = !this.showReg;
    this.showLogin = !this.showLogin;
  }
}
