import mongoose, {Document, Model, Schema} from "mongoose";

export interface ILivros extends Document{
    titulo: string;
    autor: string;
    ISBN: string;
    status: string;
}

const LivrosSchema:Schema<ILivros> = new Schema ({
    titulo:{type: String, required: true},
    autor:{type: String, required: true},
    ISBN:{ type: String, required: true, unique: true},
    status:{type: String, enum: ["Disponível", "Emprestado"], default: "ativo"},
});

const Livros: Model<ILivros> = mongoose.models.Livros || mongoose.model<ILivros>("Livros", LivrosSchema);

export default Livros;