import { NextResponse } from 'next/server';
import { AppError } from '@/application/errors';

export const ok = (data: unknown, status = 200) => NextResponse.json(data, { status });

export const fail = (error: unknown) => {
  if (error instanceof AppError) return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: error.status });
  return NextResponse.json({ error: { code: 'INTERNAL', message: 'Internal server error' } }, { status: 500 });
};
