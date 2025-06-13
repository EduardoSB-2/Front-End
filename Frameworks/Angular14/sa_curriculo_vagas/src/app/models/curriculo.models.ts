import { map } from "rxjs";

export class Curriculo {

  constructor(
    public nome: string,
    public idade: number,
    public genero: string,
    public email: string,
    public telefone: string,
    public habilidades: string,
    public experiencia: string,
    public formacao: string,
    public id?: any
  ){}

toMap(): { [key: string]: any } {
  return {
    nome: this.nome,

    idade: this.idade,
    genero: this.genero,
    email: this.email,
    telefone: this.telefone,
    habilidades: this.habilidades,
    experiencia: this.experiencia,
    formacao: this.formacao,

  };
}

static fromMap(map: any): Curriculo {
  return new Curriculo(
    map.nome,
    map.idade,
    map.genero,
    map.email,
    map.telefone,
    map.habilidades,
    map.experiencia,
    map.formacao,
    map.id

  )
}
}
