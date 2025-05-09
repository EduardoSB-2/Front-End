import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { Cliente } from '../models/cliente.model';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class DadosService { //controller - classe de interação entre o model e o visual
  //atributos
  private clientes: Cliente[] = [];
  private produtos: Produto[] = [];
  private pedidos: Pedido[] = [];

  constructor() { }


  //funcões para pegar as informações do vetor
  getClientes(): Cliente[] {
    return this.clientes;
  }

  getProdutos(): Produto[] {
    return this.produtos;
  }

  getPedidos(): Pedido[] {
    return this.pedidos;
  }

  //métodos para adicionar informações no vetor

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  adicionarProduto(produto: Produto): void {
    this.produtos.push(produto);
  }

  adicionarPedido(pedido: Pedido): void {
    this.pedidos.push(pedido);
  }
}

