import { connection } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";

// IN NEXT JS EVERY TIME YOU HAVE TO CALL THIS DATABASE CONNECTION FUNCTION 
connection()



export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "user does not exist" },
                { status: 404 });
        };

        const isValidPassword = await bcryptjs.compare(password, user.password);



    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}
