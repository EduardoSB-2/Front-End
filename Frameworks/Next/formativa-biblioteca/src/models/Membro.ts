import mongoose, {Document, Model, Schema} from "mongoose";

export interface IMembro extends Document{
    _id: string;
    nome: string;
    email: string;
}

const MembroSchema:Schema<IMembro> = new Schema({
    nome: {type: String, required: true,},
    email: {type: String, required: true, unique: true},
});

const Membro: Model<IMembro> = mongoose.models.Membro || mongoose.model<IMembro>("Membros", MembroSchema);

export default Membro;