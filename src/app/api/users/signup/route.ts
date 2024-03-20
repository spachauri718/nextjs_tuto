import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


// IN NEXT JS EVERY TIME YOU HAVE TO CALL THIS DATABASE CONNECTION FUNCTION 
connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();

        console.log(reqBody);
        
        
        // extracting details from the request body

        const { username, email, password } = reqBody

        // check if user already exists

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                {
                    error: "User already exists"
                },
                { status: 404 }
            )
        }

        // HASH PASSWORD

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);



        const newUser = await new User({
            username,
            email,
            password :  hashedPassword,
        }).save();

        return NextResponse.json({
            message : 'User saved successfully',
            success : true,
            newUser
        });


        

        

    }
    catch (error: any) {
        return NextResponse.json({
            error: error.message
        });
    }

}

