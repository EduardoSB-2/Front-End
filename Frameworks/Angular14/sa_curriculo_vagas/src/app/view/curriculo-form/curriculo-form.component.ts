import { Component } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.models';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-curriculo-form',
  templateUrl: './curriculo-form.component.html',
  styleUrls: ['./curriculo-form.component.scss'],
})
export class CurriculoFormComponent {
  public curriculo: Curriculo = new Curriculo('', 0,  '', '', '', '', '', '');

  constructor(private curriculoService: CurriculoService) {}

  cadastrar() {
    this.curriculoService.cadastrarCurriculo(this.curriculo).subscribe({
      next: () => {
        alert('Currículo cadastrado com sucesso!');
        this.curriculo = new Curriculo('', 0,  '', '', '', '', '', '');
      },
      error: (err) => {
        alert('Erro ao cadastrar currículo!');
        console.error(err);
      },
    });
  }
}
