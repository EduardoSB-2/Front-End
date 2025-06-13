import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.models';
import { CurriculoService } from 'src/app/service/curriculo.service';


@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss'],
})
export class CurriculosComponent implements OnInit {
  public curriculos: Curriculo[] = [];

  constructor(private _curriculoservice: CurriculoService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    this._curriculoservice.getCurriculo().subscribe((retornaCurriculo) => {
      this.curriculos = retornaCurriculo.map((item) => Curriculo.fromMap(item));
    });
  }

  atualizarCurriculo(id: number, Curriculo: Curriculo) {
    this._curriculoservice.atualizarCurriculo(id, Curriculo).subscribe({
      next: () => {
        this.listarCurriculos();
      },
      error: (err) => {
        console.error('Erro ao Atualizar', err);
      },
    });
  }

  deletarCurriculo(id: any) {
    this._curriculoservice.removerCurriculo(id).subscribe({
      next: () => {
        this.listarCurriculos();
      },
      error: (err) => {
        console.error('Erro ao Excluir', err);
      },
    });
  }
}
