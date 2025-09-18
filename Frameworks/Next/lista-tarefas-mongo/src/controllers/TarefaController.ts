//funções do Controller (CRUD)

import Tarefa, { Itarefa } from "@/models/Tarefa";
import connectMongo from "@/services/mongodb";

//read - Pegar as tarefas do banco e retornar em uma lista(vetor)
export const readAllTarefas = async (): Promise<Itarefa[]> =>{
    await connectMongo();
    const tarefas = await Tarefa.find({}); //pega todasas tarefas da coleção
    return tarefas; // Retorna o vetor de tarefas
}

//create - Criar uma tarefa na coleção
export async function createTarefa(data: Partial<Itarefa>): Promise<Itarefa> {
    await connectMongo();
    const tarefa = await Tarefa.create(data);
    return tarefa; //retorna a tarefa com o ID
}

//update - Atualizar uma tarefa na coleção
export async function updateTarefa(id: string, data: Partial<Itarefa>): Promise<Itarefa | null> {
    await connectMongo();
    const tarefa = await Tarefa.findByIdAndUpdate(id, data);
    return tarefa;
}

//delete - Deletar uma tarefa na coleção
export const deleteTarefa = async(id:string):Promise<boolean> =>{
    await connectMongo();
    const resultado = await Tarefa.deleteOne({_id:id});
    return resultado.deletedCount>0;
}