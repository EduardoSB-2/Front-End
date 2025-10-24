import Emprestimo, { IEmprestimo } from "@/models/Emprestimo";
import Livros from "@/models/Livros";
import connectMongo from "@/services/mongodb";

export const getAllEmprestimos = async () => {
  await connectMongo();
  const emprestimos = await Emprestimo.find({})
    .populate("livroId", "titulo autor ISBN")
    .populate("membroId", "nome email");
  return emprestimos;
};

export const getEmprestimoById = async (id: string) => {
  await connectMongo();
  const emprestimo = await Emprestimo.findById(id)
    .populate("livroId", "titulo autor ISBN")
    .populate("membroId", "nome email");
  return emprestimo;
};

export const createEmprestimo = async (data: Partial<IEmprestimo>) => {
  await connectMongo();

  // Verificar se o livro está disponível
  const livro = await Livros.findById(data.livroId);
  if (!livro || livro.status !== "Disponível") {
    throw new Error("Livro não disponível para empréstimo");
  }

  const novoEmprestimo = new Emprestimo(data);
  const emprestimoSalvo = await novoEmprestimo.save();

  // Atualizar status do livro
  await Livros.findByIdAndUpdate(data.livroId, { status: "Emprestado" });

  return emprestimoSalvo;
};

export const devolverLivro = async (id: string) => {
  await connectMongo();

  const emprestimo = await Emprestimo.findById(id);
  if (!emprestimo) {
    throw new Error("Empréstimo não encontrado");
  }

  if (emprestimo.status === "devolvido") {
    throw new Error("Livro já foi devolvido");
  }

  // Atualizar empréstimo
  emprestimo.status = "devolvido";
  emprestimo.dataDevolucaoReal = new Date();
  await emprestimo.save();

  // Atualizar status do livro
  await Livros.findByIdAndUpdate(emprestimo.livroId, { status: "Disponível" });

  return emprestimo;
};

export const deleteEmprestimo = async (id: string) => {
  await connectMongo();
  await Emprestimo.findByIdAndDelete(id);
};
