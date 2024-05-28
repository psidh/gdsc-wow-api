import { connect } from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import UserRegistration from '@/models/user_registration_model';
connect();

export async function GET(req: NextRequest) {
  try {
    const accommodationCount = await UserRegistration.countDocuments({
      accomadation_necessary: true,
    });

    return NextResponse.json({ accommodationCount }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
