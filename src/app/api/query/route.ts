import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    // Test balance as a number instead of string
    const balance = 0.5;
    
    return NextResponse.json({ balance });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
};