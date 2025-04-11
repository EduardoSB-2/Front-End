class Funcionario{
    constructor(nome, salario, cargo){
        this.nome = nome;
        this.salario = salario;
        this.cargo = cargo;
    }

    aumentarSalario(percentual){
        if(percentual <= 0){
            console.log(`Não Ocorreu Nenhum Aumento no Salário`);
            return;
        }
        this.salario += percentual;
        console.log(`Aumento de R$${percentual} no seu Salário. Seu Salário atual é de: R$${this.salario}`);

    }

    exibirInfo(){
        console.log(`Nome: ${this.nome}. Salário atual: R$${this.salario}. Cargo: ${this.cargo}`);
    }
}

let p1 = new Funcionario("Gilson", 5500, "Supervisor");
p1.exibirInfo();
p1.aumentarSalario(500);
p1.exibirInfo();