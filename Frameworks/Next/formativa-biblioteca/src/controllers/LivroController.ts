import Livros, { ILivros } from "@/models/Livros";
import connectMongo from "@/services/mongodb";

export const getAllLivro = async () => {
  await connectMongo();
  const livros = await Livros.find({});
  return livros;
};

export const getOneLivro = async (ISBN: string) => {
  await connectMongo();
  const livro = await Livros.findOne({ISBN});
  return livro;
};

export const createLivro = async (data: Partial<ILivros>) => {
  await connectMongo();
  const novoLivro = new Livros(data);
  const novoLivroId = await novoLivro.save();
  return novoLivroId;
};

export const updateLivro = async (ISBN: string, data: Partial<ILivros>) => {
  await connectMongo();
  const livroAtualizado = await Livros.findByIdAndUpdate(ISBN, data, {
    new: true,
  });
  return livroAtualizado;
};

export const deleteLivro = async (ISBN: string) => {
  await connectMongo();
  await Livros.findByIdAndDelete(ISBN);
};
