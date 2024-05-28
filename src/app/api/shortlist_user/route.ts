import { connect } from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/models/user_model';
connect();
export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email } = await req.json();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { status: false, Message: 'User is already shortlisted' },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = new User({ first_name, last_name, email });

    await newUser.save();

    // Send response
    return NextResponse.json(
      { status: true, Message: 'Shortlisted. Sent the email :)' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await User.find();

    return NextResponse.json(users);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
