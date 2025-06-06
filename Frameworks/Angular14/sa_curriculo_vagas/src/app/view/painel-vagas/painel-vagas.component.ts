import { Component, OnInit } from '@angular/core';
import { Vaga } from 'src/app/models/vaga.models';
import { VagaService } from 'src/app/service/vaga.service';

@Component({
  selector: 'app-painel-vagas',
  templateUrl: './painel-vagas.component.html',
  styleUrls: ['./painel-vagas.component.scss'],
})
export class PainelVagasComponent implements OnInit {
  public vaga: Vaga = new Vaga(0, '', '', '', 0);
  public vagas: Vaga[] = [];

  constructor(private _vagasService: VagaService) {}

  ngOnInit(): void {
    this.listarVagas();
  }

  listarVagas() {
    this._vagasService.getVagas().subscribe((retornoVaga) => {
      this.vagas = retornoVaga.map((item) => Vaga.fromMap(item));
    });
  }

  //listar Vaga Unica
  listarVagaUnica(vaga: Vaga) {
    this.vaga = vaga;
  }

  //cadastrar nova vaga

  cadastrar() {
    this._vagasService.cadastrarVaga(this.vaga).subscribe({
      next: () => {
        this.vaga = new Vaga(0, '', '', '', 0);
        this.listarVagas();
      },
      error: (err) => {
        console.error('Erro ao Cadastrar', err);
      },
    });
  }

  //atualizar nova vaga
  atualizar(id: number) {
    this._vagasService.atualizarVaga(id, this.vaga).subscribe({
      next:
      () => {
        this.vaga = new Vaga(0, '', '', '', 0);
        this.listarVagas();
      },
      error:(err) => {
        console.error('Erro ao Atualizar', err);
      }
  });
  }

  //deletar vaga
  excluir(id: number) {
    this._vagasService.removerVaga(id).subscribe({
      next: () => {
        this.listarVagas();
      },
      error: (err) => {
        console.error('Erro ao Deletar', err);
      }
  });
  }
}
