import { NextRequest, NextResponse } from 'next/server';
import { getOneLivro, updateLivro, deleteLivro } from '@/controllers/LivroController';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ isbn: string }> }
) {
  const { isbn } = await params;
  try {
    const livro = await getOneLivro(isbn);
    if (!livro) {
      return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 });
    }
    return NextResponse.json(livro);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ isbn: string }> }
) {
  const { isbn } = await params;
  try {
    const body = await request.json();
    const livroAtualizado = await updateLivro(isbn, body);
    if (!livroAtualizado) {
      return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 });
    }
    return NextResponse.json(livroAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ isbn: string }> }
) {
  const { isbn } = await params;
  try {
    await deleteLivro(isbn);
    return NextResponse.json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
