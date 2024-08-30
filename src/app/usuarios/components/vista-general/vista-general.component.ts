import { Component } from '@angular/core';
import { HttpLavavelService } from '../../../http.service';
import Swal from 'sweetalert2';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-vista-general',
  templateUrl: './vista-general.component.html',
  styleUrl: './vista-general.component.scss'
})
export class VistaGeneralComponent {
  Datos: any;
  page: number = 0;
  rows: number = 10;
  total: number = 0;

  constructor(private servicio: HttpLavavelService){
    this.obtenerData();
  }

  obtenerData(){
    this.servicio.Service_Get_Paginator('usuario', '', this.page, this.page).subscribe((res : any) => {
      if(res.estatus){
        this.Datos = res.data;
        this.total = res.total;
      }
      console.log(res);
    });
  }

  EliminarRegistro(id: number){
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "¡Esto ya no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "Cancelar",
      confirmButtonText: "!Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.Service_Delete('usuario', id).subscribe((res : any) => {
          if(res.estatus){
            Swal.fire({
              title: "¡Eliminado!",
              text: res.messaje,
              icon: "success"
            });
            this.obtenerData();
          }
          console.log(res);
        });
      }
    });
  }
  
  onPageChange(event:any){
    console.log(event);
    this.page = event.page;
    this.rows = event.rows;
    this.obtenerData();
  }
}
