import { Component } from '@angular/core';
import { HttpLavavelService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.scss'
})
export class VistaComponent {
  ID: number = 0;
  Datos: any;
  constructor(private servicio: HttpLavavelService, private activetedRoute: ActivatedRoute){
    this.activetedRoute.params.subscribe(params => {
      console.log(params);
      this.ID = params['id'];
      this.obtenerData();
    });
  }

  obtenerData(){
    this.servicio.Service_Get('usuario', this.ID).subscribe((res : any) => {
      console.log("res:",res);
      if(res.estatus){
        this.Datos = res.data;
      }
    });
  }
}
