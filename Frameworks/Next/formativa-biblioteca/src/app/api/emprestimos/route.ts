import { NextRequest, NextResponse } from 'next/server';
import { getAllEmprestimos, createEmprestimo } from '@/controllers/EmprestimoController';

export async function GET() {
  try {
    const emprestimos = await getAllEmprestimos();
    return NextResponse.json(emprestimos);
  } catch (error) {
    console.error('Erro ao buscar empréstimos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const novoEmprestimo = await createEmprestimo(body);
    return NextResponse.json(novoEmprestimo, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar empréstimo:', error);
    const message = error instanceof Error ? error.message : 'Erro interno do servidor';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
