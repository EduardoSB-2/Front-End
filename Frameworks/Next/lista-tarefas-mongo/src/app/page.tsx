//client-side
"use client";

import { Itarefa } from "@/models/Tarefa";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home() {
  //useState => armazenamento localStorage
  //armazenar as tarefas em um vetor[armazenamento, editor do Armazenamento]
  const [tarefas, setTarefas] = useState<Itarefa[]>([]);
  
  //armazenamento de uma string para o input (titulo da tarefa)
  const [novaTarefa, setNovaTarefa] = useState<string>("");

  //useEffect => permite a execução de funções, sem o recarregamento da tela
  useEffect(()=> {
    //carregar todas as tarefas do banco de dados
    buscarTarefas();
  }, []);

  //Criar as funções que serão executadas na tela
  const buscarTarefas = async() => {
    try {
      //fetch => Método GET é padrão, não precisa declarar
      const resposta = await fetch("/api/tarefas"); //conecta com o route.ts
      //Realizar a conexão http com o backend
      const data = await resposta.json() //Converte em JSON
      if(data.sucess){
        setTarefas(data.data)
      }
    } catch (error) {
      console.error(error); //Exibe o erro no console

    }
  }

  //AdicionarTarefa
  const adicionarTarefa = async(e: FormEvent) => {
    e.preventDefault(); //Evita o recarregamento da página em eventos HTML
    //Verifica se o campo não está vazio
    if(!novaTarefa.trim()) return; //Não permite adiconar tarefas vazias no banco de dados
    try {
      const resultado = await fetch("api/tarefas",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({titulo:novaTarefa}) 
      });
      const data = await resultado.json();
      if(data.sucess){//se resultado for ok
        //adicionar a tarefa no vetor
        setNovaTarefa(""); //limpa o campo do input
        //cliente-side - adiciono sem buscar a nova tarefa no BD
        setTarefas([...tarefas, data.data]);
        //server-side - buscando a nova tarefa no BD
        buscarTarefas();
      }
    } catch (error) {
      console.error(error);
    }
  }

  //AtualizarTarefa
  const atualizarTarefa = async (id:string, status: boolean) => {
    try {
      const resposta = await fetch(`/api/tarefas/${id}`,{
        method: "PATCH",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({concluida: !status})
      });
      const data = await resposta.json();
      if(data.sucess){
        //cliente-Side
        setTarefas(tarefas.map((tarefa)=>(tarefa._id === id ? data.data: tarefa)));
        //server-side
        buscarTarefas();
      }
    } catch (error) {
      console.error(error);
    }
  }

  //DeletarTarefa
  const DeletarTarefa = async (id:string) => {
    try{
      await fetch(`/api/tarefas/${id}`,{
        method: "DELETE"
      });
      buscarTarefas();
    } catch (error) {
      console.error(error);
    }
  }

  //Interface do Usuário ReactDom
  return(
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionarTarefa}>
        <input type="text"
        value={novaTarefa}
        onChange={(e:ChangeEvent<HTMLInputElement>)=> setNovaTarefa(e.target.value)}
        placeholder="Adiconar Uma Nova Tarefa" />
        <button type="submit">Adicionar Tarefa</button>
      </form>
      <ul>
        {tarefas.map((tarefa)=>(
          <li key={tarefa._id.toString()}>
            <input type="checkbox"
            checked={tarefa.concluida}
            onChange={()=> atualizarTarefa(tarefa._id.toString(), tarefa.concluida)} />
            {tarefa.titulo}
            <button onClick={() => DeletarTarefa(tarefa._id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}