import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.models';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss']
})
export class CurriculosComponent implements OnInit {
  public curriculos: Curriculo[] = [];

  constructor(private _curriculoservice: CurriculoService){}

ngOnInit(): void {
  this.listarCurriculos();
}

listarCurriculos() {
  this._curriculoservice.getCurriculo().subscribe(
    (retornaCurriculo) => {
      this.curriculos = retornaCurriculo.map(
        (item) => Curriculo.fromMap(item)
      );}
  );}
}
