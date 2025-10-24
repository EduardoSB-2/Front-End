import { NextRequest, NextResponse } from 'next/server';
import { getEmprestimoById, devolverLivro, deleteEmprestimo } from '@/controllers/EmprestimoController';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const emprestimo = await getEmprestimoById(id);
    if (!emprestimo) {
      return NextResponse.json({ error: 'Empréstimo não encontrado' }, { status: 404 });
    }
    return NextResponse.json(emprestimo);
  } catch (error) {
    console.error('Erro ao buscar empréstimo:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    if (body.action === 'devolver') {
      const emprestimo = await devolverLivro(id);
      return NextResponse.json(emprestimo);
    }
    return NextResponse.json({ error: 'Ação não suportada' }, { status: 400 });
  } catch (error) {
    console.error('Erro ao atualizar empréstimo:', error);
    const message = error instanceof Error ? error.message : 'Erro interno do servidor';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await deleteEmprestimo(id);
    return NextResponse.json({ message: 'Empréstimo deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar empréstimo:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
