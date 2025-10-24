import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, senha } = await request.json();

  if (email === 'admin@admin.com' && senha === '123456') {
    const payload = { role: 'admin' };
    const token = btoa(JSON.stringify({ alg: 'HS256' })) + '.' + btoa(JSON.stringify(payload)) + '.signature';

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
