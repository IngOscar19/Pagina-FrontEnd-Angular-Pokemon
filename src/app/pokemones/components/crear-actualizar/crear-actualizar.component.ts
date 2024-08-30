import { HttpLavavelService } from './../../../http.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-actualizar',
  templateUrl: './crear-actualizar.component.html',
  styleUrls: ['./crear-actualizar.component.scss']
})
export class CrearActualizarPokemonesComponent {

  tipos: { label: string, value: string }[] = [
    { label: 'Bicho', value: 'Bicho' },
    { label: 'Dragón', value: 'Dragón' },
    { label: 'Eléctrico', value: 'Eléctrico' },
    { label: 'Hada', value: 'Hada' },
    { label: 'Lucha', value: 'Lucha' },
    { label: 'Fuego', value: 'Fuego' },
    { label: 'Volador', value: 'Volador' },
    { label: 'Planta', value: 'Planta' },
    { label: 'Tierra', value: 'Tierra' },
    { label: 'Fantasma', value: 'Fantasma' },
    { label: 'Hielo', value: 'Hielo' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Veneno', value: 'Veneno' },
    { label: 'Psíquico', value: 'Psíquico' },
    { label: 'Roca', value: 'Roca' },
    { label: 'Agua', value: 'Agua' }
  ];

  public CrearActualizarFormulario: FormGroup;
  ID: number | undefined = undefined;

  constructor(
    private fb: FormBuilder, 
    public servicio: HttpLavavelService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {
    this.CrearActualizarFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      url_imagen: ['', [Validators.required]],
      hp: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
      defensa: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
      ataque: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
      rapidez: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
    });

    this.activatedRoute.params.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        this.ID = +idParam;
        this.obtenerData();
      }
    });

    [ 'defensa', 'ataque', 'rapidez'].forEach(field => {
      this.CrearActualizarFormulario.get(field)?.valueChanges.subscribe(value => {
        if (value > 999) {
          this.CrearActualizarFormulario.get(field)?.setValue(100, { emitEvent: false });
        }
      });
    });

    ['hp'].forEach(field => {
      this.CrearActualizarFormulario.get(field)?.valueChanges.subscribe(value => {
        if (value > 999) {
          this.CrearActualizarFormulario.get(field)?.setValue(999, { emitEvent: false });
        }
      });
    });
  }

  obtenerData() {
    if (this.ID) {
      this.servicio.Service_Get('pokemon', this.ID).subscribe((res: any) => {
        if (res.estatus) {
          this.CrearActualizarFormulario.patchValue(res.data);
        } else {
          Swal.fire({
            icon: "error",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }

  isValid(field: string): boolean {
    return !!(this.CrearActualizarFormulario.controls[field].errors && this.CrearActualizarFormulario.controls[field].touched);
  }

  get f() { return this.CrearActualizarFormulario.controls; }

  Guardar() {
    if (this.CrearActualizarFormulario.invalid) {
      this.CrearActualizarFormulario.markAllAsTouched();
      return;
    }

    ['hp', 'defensa', 'ataque', 'rapidez'].forEach(field => {
      let value = this.CrearActualizarFormulario.get(field)?.value;
      if (value > 999) {
        this.CrearActualizarFormulario.get(field)?.setValue(100);
      }
    });

    if (this.ID == null) {
      this.servicio.Service_Post('pokemon', '', this.CrearActualizarFormulario.value).subscribe((res: any) => {
        if (res.estatus) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "<strong>Éxito!</strong>",
            html: "Pokémon guardado",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'custom-alert-popup',
              title: 'custom-alert-title',
              icon: 'custom-alert-icon',
            },
            background: '#e7f9ee',
            backdrop: false,
            toast: true,
          });
          
          this.CrearActualizarFormulario.reset();
        } else {
          this.mostrarErrores(res.mensaje);
        }
      });
    } else {
  
      this.servicio.Service_Patch('pokemon', this.ID, this.CrearActualizarFormulario.value).subscribe((res: any) => {
        if (res.estatus) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "<strong>Éxito!</strong>",
            html: "Pokémon actualizado",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'custom-alert-popup',
              title: 'custom-alert-title',
              icon: 'custom-alert-icon',
            },
            background: '#e7f9ee',
            backdrop: false,
            toast: true,
          });
          this.router.navigate(['verpokemon', this.ID]);
        } else {
          this.mostrarErrores(res.mensaje);
        }
      });
    }
  }

  mostrarErrores(mensaje: any) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "<strong>Problema al guardar</strong>",
      html: mensaje,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'custom-alert-popup',
        title: 'custom-alert-title',
        icon: 'custom-alert-icon',
      },
      background: '#d21e48',
      backdrop: false,
      toast: true,
    });
  }
}
