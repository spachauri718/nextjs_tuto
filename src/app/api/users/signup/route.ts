import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


// IN NEXT JS EVERY TIME YOU HAVE TO CALL THIS DATABASE CONNECTION FUNCTION 
connection()

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



        const newUser = new User({
            username,
            email,
            password :  hashedPassword,
        }).save();

        return NextResponse.json({
            message : 'User saved successfully',
            success : true,
            newUser
        });


        

        // create token data

        const tokenData = {
            id:user._id,
            email:user.email,
            username:user.username 
        }

        //create token

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: "1d"})

        const response = NextResponse.json({
            message : "Login successful",
            success : true,
        })

        response.cookies.set("token", token,{
            httpOnly: true,
        })

        return response;

        

    }
    catch (error: any) {
        return NextResponse.json({
            error: error.message
        });
    }

}

