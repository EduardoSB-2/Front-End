import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.models';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculo-list.component.html',
  styleUrls: ['./curriculo-list.component.scss'],
})
export class CurriculosComponent implements OnInit {
  public curriculo: Curriculo = new Curriculo("", 0, "", "", "", "", "", "");

  public curriculos: Curriculo[] = [];
  router: any;

  constructor(private _curriculoservice: CurriculoService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    this._curriculoservice.getCurriculo().subscribe((retornaCurriculo) => {
      this.curriculos = retornaCurriculo.map((item) => Curriculo.fromMap(item));
      return new Curriculo(
        item.nome,
        item.email,
        item.telefone,
        item.idade,
        item.genero,
        item.habilidades
        item.experiencia,
        item.formacao,
      )
    });
  }
}
