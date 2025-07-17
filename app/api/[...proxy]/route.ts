// /api/[...proxy]/route.ts


import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE = process.env.API_BASE_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: { proxy: string[] } },
) {
  return handleProxy(req, params.proxy, 'GET');
}

export async function POST(
  req: NextRequest,
  { params }: { params: { proxy: string[] } },
) {
  return handleProxy(req, params.proxy, 'POST');
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { proxy: string[] } },
) {
  return handleProxy(req, params.proxy, 'PUT');
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { proxy: string[] } },
) {
  return handleProxy(req, params.proxy, 'DELETE');
}

async function handleProxy(
  req: NextRequest,
  pathParts: string[],
  method: string,
): Promise<NextResponse> {
  try {
    // 1. Build the target URL
    const targetPath = pathParts.join('/');
    const targetUrl = `${BACKEND_BASE}/${targetPath}${req.nextUrl.search}`;

    // 2. Grab session token once
    const cookieStore = await cookies();
    const token =
      cookieStore.get('session')?.value ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImN1c3RvbWVyX2lkIjozLCJpYXQiOjE3NTI3NDgwNzksImV4cCI6MTc1Mjc3Njg3OX0.UG-T8WYJO2t-h1SimAFRc_TC71MCLYw1rDj5IuXbvKw';
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 3. Forward request
    const body =
      method === 'GET' || method === 'HEAD' ? undefined : await req.text();

    const res = await fetch(targetUrl, {
      method,
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body,
      cache: 'no-store',
    });

    // 4. Handle backend errors centrally
    if (!res.ok) {
      const err = await safeJson(res);
      return NextResponse.json(
        { error: err?.message || 'Backend error', status: res.status },
        { status: res.status },
      );
    }

    // 5. Stream back response
    const data = await safeJson(res);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal proxy error' },
      { status: 500 },
    );
  }
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
