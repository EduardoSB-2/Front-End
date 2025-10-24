import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEmprestimo extends Document {
  livroId: mongoose.Types.ObjectId;
  membroId: mongoose.Types.ObjectId;
  dataEmprestimo: Date;
  dataDevolucaoPrevista: Date;
  dataDevolucaoReal?: Date;
  status: "ativo" | "devolvido";
}

const EmprestimoSchema: Schema<IEmprestimo> = new Schema({
  livroId: { type: Schema.Types.ObjectId, ref: "Livros", required: true },
  membroId: { type: Schema.Types.ObjectId, ref: "Membros", required: true },
  dataEmprestimo: { type: Date, default: Date.now },
  dataDevolucaoPrevista: { type: Date, required: true },
  dataDevolucaoReal: { type: Date },
  status: { type: String, enum: ["ativo", "devolvido"], default: "ativo" },
});

const Emprestimo: Model<IEmprestimo> = mongoose.models.Emprestimo || mongoose.model<IEmprestimo>("Emprestimos", EmprestimoSchema);

export default Emprestimo;
