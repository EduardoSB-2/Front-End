import mongoose, {Document, Model, Schema} from "mongoose";

export interface IMembro extends Document{
    _id: string;
    nome: string;
    email: string;
    senha: string;
    funcao: string;
}

const MembroSchema:Schema<IMembro> = new Schema({
    nome: {type: String, required: true,},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    funcao: {type: String, required: true},
});

const Membro: Model<IMembro> = mongoose.models.Membro || mongoose.model<IMembro>("Membros", MembroSchema);

export default Membro;
