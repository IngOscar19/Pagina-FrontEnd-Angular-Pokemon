import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpLavavelService } from '../../../http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarPokemonesComponent implements OnInit {
  mostrarCrear: boolean = true;
  mostrarEliminarEditar: boolean = false;
  item: any;
  nombreUsuario: string = ''; 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicio: HttpLavavelService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const url = this.router.url;

      this.mostrarCrear = url !== '/createpokemones';

      const ver = /^\/verpokemones\/(\d+)$/.exec(url);
      const editar = /^\/actualizarpokemones\/(\d+)$/.exec(url);
      if (ver) {
        this.mostrarEliminarEditar = true;
        this.obtenerPokemon(ver[1]);
        this.mostrarCrear = false;
      }
      else if (editar) {
        this.mostrarEliminarEditar = false;
        this.obtenerPokemon(editar[1]);
        this.mostrarCrear = false;
      }
      else {
        this.mostrarEliminarEditar = false;
      }
    });
  }

  obtenerPokemon(id: string) {
    this.servicio.Service_Get('pokemon', id).subscribe(
      (res: any) => {
        if (res.estatus) {
          this.item = res.data;
          this.obtenerNombreUsuario(this.item.id_user);
          console.log(this.item.id_user);
        } else {
          console.error('Error al obtener el Pokemon:', res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  obtenerNombreUsuario(id_user: string) {
    this.servicio.Service_Get('usuario', id_user).subscribe(
      (res: any) => {
        if (res.estatus) {
          this.nombreUsuario = res.data.name;
        } else {
          console.error('Error al obtener el nombre del usuario:', res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  eliminarPokemon() {
    if (this.item) {
      Swal.fire({
        title: "¿Estás seguro de eliminar este Pokemon?",
        text: "¡Esta acción no se puede deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.servicio.Service_Delete('pokemon', this.item.id).subscribe(
            (res: any) => {
              if (res.estatus) {
                Swal.fire({
                  title: "¡Eliminado!",
                  text: "El Pokemon ha sido eliminado.",
                  icon: "success"
                });
                this.router.navigate(['/vistapokemones']); 
              } else {
                Swal.fire({
                  title: "Error",
                  text: res.mensaje,
                  icon: "error"
                });
              }
            },
            (error) => {
              console.error('Error en la solicitud:', error);
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el Pokemon.",
                icon: "error"
              });
            }
          );
        }
      });
    }
  }
}