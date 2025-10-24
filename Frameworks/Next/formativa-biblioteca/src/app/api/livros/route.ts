import { NextRequest, NextResponse } from 'next/server';
import { getAllLivro, createLivro } from '@/controllers/LivroController';

export async function GET() {
  try {
    const livros = await getAllLivro();
    return NextResponse.json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const novoLivro = await createLivro(body);
    return NextResponse.json(novoLivro, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
