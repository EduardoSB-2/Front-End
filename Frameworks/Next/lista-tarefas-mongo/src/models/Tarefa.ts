import mongoose, { Document, Model, Schema } from "mongoose";

//Definir a estrutura do objeto
export interface Itarefa extends Document{
    //herdamos a base de documentos do mongoose
    //atributos do obj
    _id: string;
    titulo: string;
    concluida: boolean;
    dataCriacao: Date;
}

//Criar as Regras (Schema) do MongoDB

const TarefaSchema: Schema<Itarefa> = new mongoose.Schema({
    titulo:{
        type: String,
        required:[true, "O título é obrigatório"],
        maxlength:[50, "maximo de 50 char"]
    },
    concluida:{
        type:Boolean,
        default: false
    },
    dataCriacao:{
        type: Date,
        default: Date.now
    }
})

//toMap e fromMap do modelo
const Tarefa:Model<Itarefa> = mongoose.models.Tarefa || mongoose.model<Itarefa>("Tarefa", TarefaSchema);

//Transformar em um componente reutilizavel
export default Tarefa;