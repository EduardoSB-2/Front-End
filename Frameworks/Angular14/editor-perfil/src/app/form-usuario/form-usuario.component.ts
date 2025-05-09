import { Component } from '@angular/core';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {

  //atributos
  nome: string = "";
  email: string = "";
  telefone: string = "";
  genero: string = "";
  idade: number | null = null;
  profissao: string = "";

  //métodos
  limparDados(){
    this.nome = "";
    this.email = "";
    this.telefone = "";
    this.genero = "";
    this.idade = null;
    this.profissao = "";
  }

    //Validação
    validacao(): String[]{
      const erros: string[] = [];
    if (this.nome == "") {
      alert("Campo do nome está vazio");
    } else if (this.email == "") {

      alert("Campo do email está vazio");
    }else if (this.telefone == "") {

      alert("Campo de telefone está vazio");
    }else if (this.genero == "") {

      alert("Campo de gênero é obrigatório");
    }else if (this.idade == null) {

      alert("Campo de idade é obrigatório");
    } if (this.profissao == "") {

      alert("Campo de profissão está vazio");
    } return erros;
  }

  enviarFormulario(){
    const erros = this.validacao();

    if(erros.length>0){
      alert("Erros no Formulário:\n" + erros.join("\n"));
      return;
    }
    this.limparDados();
    alert("Formulário Enviado com Sucesso");
  }
  }



