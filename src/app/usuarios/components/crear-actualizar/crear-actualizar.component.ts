import { HttpLavavelService } from './../../../http.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-actualizar',
  templateUrl: './crear-actualizar.component.html',
  styleUrl: './crear-actualizar.component.scss'
})
export class CrearActualizarComponent {
  public CrearActualizarFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
        password: ['', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$')
        ]]
  });

  ID = 0;
  constructor(private fb: FormBuilder,public servicio: HttpLavavelService, private activatedRoute: ActivatedRoute,private router: Router) {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params);
      this.ID=params['id'];
      if (this.ID) {
        this.obtenerData();
        this.eliminarValidaciones();
      }
    });
  }

  eliminarValidaciones(){
    this.CrearActualizarFormulario.get('email')?.clearValidators();
    this.CrearActualizarFormulario.get('password')?.clearValidators();
  }

  obtenerData(){
    this.servicio.Service_Get('usuario', this.ID).subscribe((res : any) => {
      console.log("res:",res);
      if(res.estatus){
        this.CrearActualizarFormulario.patchValue(res.data);
        //this.Datos = res.mensaje;
      }
      else{
        Swal.fire({
          icon: "error",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
      });
      this.router.navigate(['vista']);
      }
    });
  }

  isValid(field: string): boolean {
    return !!(this.CrearActualizarFormulario.controls[field].errors && this.CrearActualizarFormulario.controls[field].touched);
  }

  get f(){ return this.CrearActualizarFormulario.controls; }

  Guardar(){
    if(this.CrearActualizarFormulario.invalid){
      this.CrearActualizarFormulario.markAllAsTouched();
      return;
    }
    console.log(this.CrearActualizarFormulario.value);
    if (this.ID === undefined){
      this.servicio.Service_Post('usuario', '', this.CrearActualizarFormulario.value).subscribe((res : any) => {
        console.log("res:",res);
        if(res.estatus){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario Creado",
            showConfirmButton: false,
            timer: 1500
          });
          this.CrearActualizarFormulario.reset();
        }
        else {
          let message = '';
          if (res.mensaje.name) {
              message += `Name: ${res.mensaje.name}\n`;
          }
          if (res.mensaje.email) {
              message += `Email: ${res.mensaje.email}\n`;
          }
          if (res.mensaje.password) {
              message += `Password: ${res.mensaje.password}\n`;
          }
          Swal.fire({
              icon: "error",
              title: "Tenemos un problema...",
              text: message.trim(),
              timer: 1500
          });
        }
      });
    }
    else{
      this.servicio.Service_Patch('usuario', this.ID, this.CrearActualizarFormulario.value).subscribe((res : any) => {
        console.log("res:",res);
        if(res.estatus){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario Modificado",
            showConfirmButton: false,
            timer: 1500
          });
          this.CrearActualizarFormulario.reset();
          this.router.navigate(['ver', this.ID]);
        }
        else {
          let message = '';
          if (res.mensaje.name) {
              message += `Name: ${res.mensaje.name}\n`;
          }
          if (res.mensaje.email) {
              message += `Email: ${res.mensaje.email}\n`;
          }
          if (res.mensaje.password) {
              message += `Password: ${res.mensaje.password}\n`;
          }
          Swal.fire({
              icon: "error",
              title: "Tenemos un problema...",
              text: message.trim(),
              timer: 1500
          });
        }
      });
    }
  }
}
