// /app/api/post/route.ts
import { NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

export async function POST(req: Request) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405 });
    }

    const body = await req.json();
    const { endpoint, data } = body;

    if (!endpoint || !data) {
      return NextResponse.json(
        { success: false, message: 'Missing endpoint or data' },
        { status: 400 }
      );
    }

    if (!baseUrl) {
      return NextResponse.json(
        { success: false, message: 'Missing BACKEND_BASE_URL' },
        { status: 500 }
      );
    }

    const token = req.headers.get('authorization');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = token;
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result)

    if (!response.ok || !result.success) {
      return NextResponse.json(
        { success: false, message: result.message || result.error || 'Backend error' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      token: result.token,
      message: result.message,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: 'Oops!, an unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
