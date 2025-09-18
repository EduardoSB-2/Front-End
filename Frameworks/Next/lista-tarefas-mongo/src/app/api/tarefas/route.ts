import { createTarefa, readAllTarefas } from "@/controllers/TarefaController";
import { NextRequest, NextResponse } from "next/server";

//Criar as rotas que não precisam de id - GET e POST
export async function GET(){
    try {
        const tarefas = await readAllTarefas(); //Chama o controlador
        //Trata a resposta obtida pelo mongoDB
        return NextResponse.json({sucess:true, data:tarefas});
    } catch (error) {
        return NextResponse.json({sucess:false,error:error})
}

}

export async function POST(req: NextRequest) {//req são os dados que estou enviando
    try {
        const data = await req.json(); //Verifica se os dados estão em formato JSON
        const newTarefa = await createTarefa(data);
        return NextResponse.json({sucess:true, data:newTarefa});
    } catch (error) {
        return NextResponse.json({sucess:false,error:error});
    }
}