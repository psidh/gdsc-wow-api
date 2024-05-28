import { connect } from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import UserRegistration from '@/models/user_registration_model';
connect();
export async function POST(req: NextRequest) {
  try {
    const {
      payment_utr,
      tshirt_size,
      team_id,
      accomadation_necessary,
      agenda_domain,
      uid,
      phone_number,
    } = await req.json();

    // Check if accommodation is necessary and accommodation limit is reached
    if (accomadation_necessary) {
      const accommodationCount = await UserRegistration.countDocuments({
        accomadation_necessary: true,
      });
      if (accommodationCount >= 100) {
        return NextResponse.json(
          {
            status: false,
            Message:
              'Oops! We’ve run out of accommodation. Kindly revert to gdscwowvizag@gmail.com if you really need accommodation.',
          },
          { status: 400 }
        );
      }
    }

    const existingUser = await UserRegistration.findOne({ payment_utr });
    if (existingUser) {
      return NextResponse.json(
        {
          status: false,
          Message:
            'The payment UTR is not unique! Kindly recheck your UTR, if you haven’t paid, then please pay the 500₹ and retry. If you still feel there is an issue, kindly write to gdscwowvizag@gmail.com',
        },
        { status: 400 }
      );
    }

    const isTeamLead = true;

    const newUserRegistration = new UserRegistration({
      payment_utr,
      tshirt_size,
      team_id,
      accomadation_necessary,
      agenda_domain,
      uid,
      phone_number,
      team_lead: isTeamLead,
    });

    await newUserRegistration.save();

    return NextResponse.json(
      {
        status: true,
        attendee_id: 100, // Placeholder attendee_id
        team_lead: isTeamLead,
        payment_utr,
        tshirt_size,
        team_id,
        accomadation_necessary,
        agenda_domain,
        uid,
        phone_number,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Retrieve all user registrations
    const userRegistrations = await UserRegistration.find();

    return NextResponse.json(userRegistrations, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
