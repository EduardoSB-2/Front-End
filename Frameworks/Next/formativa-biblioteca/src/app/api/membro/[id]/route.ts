import { NextRequest, NextResponse } from 'next/server';
import { getOneMembro, updateMembro, deleteMembro } from '@/controllers/MembroController';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const membro = await getOneMembro(id);
    if (!membro) {
      return NextResponse.json({ error: 'Membro não encontrado' }, { status: 404 });
    }
    return NextResponse.json(membro);
  } catch (error) {
    console.error('Erro ao buscar membro:', error);
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
    const membroAtualizado = await updateMembro(id, body);
    if (!membroAtualizado) {
      return NextResponse.json({ error: 'Membro não encontrado' }, { status: 404 });
    }
    return NextResponse.json(membroAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar membro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await deleteMembro(id);
    return NextResponse.json({ message: 'Membro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar membro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
