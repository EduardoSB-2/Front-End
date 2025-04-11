class ContaBancaria {
    constructor(titular, saldo){
        this.titular = titular;
        this.saldo = saldo;
    }


depositar(valor) {
    if (valor <= 0) {
        console.log(`Valor de Deposito Insuficiente.`);
        return;
    }
    this.saldo += valor;
    console.log(`Deposito de R$${valor} realizado com sucesso. Seu saldo atual é de: R$${this.saldo}`);
}

sacar(valor) {
    if (valor > this.saldo) {
        console.log(`Saldo Insuficiente!!! Seu saldo é de: R$${this.saldo}`);
        return;
    }
    this.saldo -= valor;
    console.log(`Saque de R$${valor} realizado com sucesso. Saldo restante de: R$${this.saldo}`);
}

exibirSaldo(){
    console.log(`Titular: ${this.titular}. Saldo atual: R$${this.saldo}`);

}
}

let p1 = new ContaBancaria("Rogerio", 1500);
p1.exibirSaldo();
p1.depositar(600);
p1.sacar(300);
p1.exibirSaldo();