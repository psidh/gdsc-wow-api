import { connect } from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import Team from '@/models/team_model';
connect();
export async function POST(req: NextRequest) {
  try {
    const { team_name, team_size, team_details, domain, team_lead } =
      await req.json();

    const existingTeam = await Team.findOne({ team_name });
    if (existingTeam) {
      return NextResponse.json(
        { status: false, Message: 'Team name is not unique' },
        { status: 400 }
      );
    }

    for (let i = 0; i < team_details.length; i++) {
      const email = team_details[i].email;
      const emailExists = await Team.findOne({ team_details: email });
      if (emailExists) {
        return NextResponse.json(
          {
            status: false,
            Message: `${email} is already a part of another team`,
          },
          { status: 400 }
        );
      }
    }

    const newTeam = new Team({
      team_name,
      team_size,
      team_details: team_details.map((detail: any) => detail.email),
      domain,
      team_lead,
    });

    await newTeam.save();

    return NextResponse.json(
      { status: true, team_id: newTeam._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
