class Carro {
    //atributos diretos
    //construtor -> define os atributos das classes
    constructor(marca, modelo, ano, cor, preco){
        this.marca/*atributo*/ = marca;//parametro
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.preco = preco;
    }
    //método
    exibirInfo(){
        console.log(`Carro: ${this.marca}, ${this.modelo}, ${this.ano}, ${this.cor}, R$${this.preco}`);

    }

}

//criar Objetos de Classe Carro
let carro1 = new Carro("FIAT", "Uno", 1994, "Cinza", 8000.00);
let carro2 = new Carro("GM", "Corsa", 2011, "Preto", 20000.00);

carro1.exibirInfo();
carro2.exibirInfo();

//atributos privados(#) e publicos

class Usuario{
    #nome; //declração de atributos privados 
    #senha; //declaração de atributos privados

    constructor(nome,senha){
        this.nome = nome;
        this.senha = senha;
    }

    //método privado
    #trocarSenha(novaSenha){
        this.#senha = novaSenha;
    }
}