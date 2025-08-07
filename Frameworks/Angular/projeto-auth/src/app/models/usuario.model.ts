export class Usuario{
    id?: number; //Opcional -- Gerado pelo json server --
    nome: string;
    email:string;
    senha: string;
    dataCriacao?: Date;

    constructor (
        nome:string,
        email:string,
        senha: string
    ){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}