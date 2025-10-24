import { NextRequest, NextResponse } from 'next/server';
import { getAllMembro, createMembro } from '@/controllers/MembroController';

export async function GET() {
  try {
    const membros = await getAllMembro();
    return NextResponse.json(membros);
  } catch (error) {
    console.error('Erro ao buscar membros:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const novoMembro = await createMembro(body);
    return NextResponse.json(novoMembro, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar membro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
