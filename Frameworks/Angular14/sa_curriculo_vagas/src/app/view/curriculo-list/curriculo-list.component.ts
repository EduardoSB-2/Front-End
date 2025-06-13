import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.models';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculo-list.component.html',
  styleUrls: ['./curriculo-list.component.scss'],
})
export class CurriculoListComponent implements OnInit {
  public curriculo: Curriculo = new Curriculo("", 0,   "", "", "", "", "", "");

  public curriculos: Curriculo[] = [];
  router: any;

  constructor(private _curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    this._curriculoService.getCurriculo().subscribe((retornaCurriculo) => {
      this.curriculos = retornaCurriculo.map((item) => Curriculo.fromMap(item));
    });
  }

  listarCurriculoUnico(curriculo: Curriculo) {
    this.curriculo = curriculo;
  }

  cadastrar(){
    this._curriculoService.cadastrarCurriculo(this.curriculo).subscribe({
      next: () => {
        this.curriculo = new Curriculo("", 0,    "", "", "", "", "", "");
        this.listarCurriculos();
      },
      error: (err) => {
        console.error('Erro ao Cadastrar', err);
      },
    });
  }

  atualizar(curriculo : Curriculo) {
    this._curriculoService.atualizarCurriculo(curriculo, this.curriculo).subscribe({
      next: () => {
        this.curriculo = new Curriculo("", 0,  "", "", "", "", "", "");
        this.listarCurriculos();
      },
      error: (err) => {
        console.error('Erro ao Atualizar', err);
      }
    });
  }

  excluir(id: any) {
    this._curriculoService.removerCurriculo(id).subscribe({
      next: () => {
        this.listarCurriculos();
        },
        error: (err) => {
        console.error('Erro ao Deletar', err);
      }
    });
  }
}
