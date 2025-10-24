import mongoose from "mongoose";

const MongoUri = process.env.DATABASE_URL;

if(!MongoUri){ 
    throw new Error("Defina o DATABASE_URL no .env.local")
}
interface MongooseCache {
  connected: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare const global: {
  mongoose: MongooseCache;
};

let cached: MongooseCache = global.mongoose;
if(!cached){
    cached = global.mongoose = {connected: null, promise: null};
}

async function connectMongo() {
    //verifica se conexão já existe , se já existe retorna a própria conexão
    if(cached.connected) return cached.connected;

    //verificar se existe uma promessa de conexão
    if(!cached.promise){ // se nula
        const aguarde = {bufferCommands: false}; //desativo o buffer de comando do mongoose
        //caso ocorra a perda de conexão
        //cria uma promessa de conexão
        cached.promise = mongoose.connect(MongoUri!, aguarde)
            .then((mongoose)=> {
                console.log("Conexão estabecida no mongo");
                return mongoose;
            });

    }
    //vou estabelecer a conexão
    try {
        //cria a conexão a partir da promessa que estava pendente
        cached.connected = await cached.promise;
    } catch (error) {
        //caso ocorra algum erro
        cached.promise = null; //limpo a promessa de conexão
        throw error;
    }
    return cached.connected;
}

export default connectMongo;
