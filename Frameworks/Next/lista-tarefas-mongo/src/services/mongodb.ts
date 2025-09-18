import mongoose from "mongoose";

//Converte String em URL
const MongoUri = process.env.DATABASE_URL;

//Verifica se o .ev.local está declarado
if (!MongoUri){ //Verifican a nulidade de uma variavel
    throw new Error("Defina o DATABASE_URL no .env.local")
}

//Criar uma variavel para armazenar o cache do sistema

let cached = (global as any).mongoose; //vao armazenar previamente do global do node, caso já exista uma conexão com o mongoDB

//Caso não exista nenhuma conexão previamnente estabelecida
if (!cached){ //Verifica a nulidade da variavel
    cached = (global as any).mongoose = {conecta:null, promessa: null};
}

//Função de conexão com o mongoDB
async function connectMongo() {
    //Verifica se a conexão já existe, se já existe retorna a prirpria conexão
    if(cached.connectada) return cached.connectada;

    //Verificar se existe uma promessa de conexão
    if(!cached.promessa){ //Se nula
        const aguarde = {bufferCommands: false}; //Desativo o buffer de comando do mongoose
        //Caso ocorra uma perda de conexão
        //Cria uma promessa de conexão
        cached.promessa = mongoose.connect(MongoUri!, aguarde)
        .then((mongoose)=> {
            console.log("Conexão estabelecida com o Mongo");
            return mongoose;
        });
    }
    //vou estabelecer a conexão
    try{
        //Cria a conexão a partir da promessa que estava pendente
        cached.connectada = await cached.promessa;
    } catch (error){
        //Caso ocorra algum erro
        cached.promessa = null; //Limpo a promessa de conexão
        throw error;
    }

    //A conexão foi estabelecida

    return cached.connectada;
}

//Transformar em um componenete reutilizavel
export default connectMongo;

//1.Passo - Criar o endereço da conexão
//2.Passo - Criar o cached, para armazenar as conexões ao longo do projeto
//3.Passo - Criar o Verificar se já existe uma conexção estabelecida com DB
//4.Passo - Criar uma promessa de conexão, caso ainda não exista
//5.Passo - Transformar a promessa em uma conexão estabelecida