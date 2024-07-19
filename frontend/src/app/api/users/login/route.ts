import { getUserByEmail } from "@/app/db/models/user";
import { comparePassword } from "@/app/helpers/bcrypt";
import { createToken } from "@/app/helpers/jwt";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();

        const { email, password } = body;

        // handle body undifined
        if (!email || !password) {
            return NextResponse.json(
                { message: "Username or Password is required" },
                { status: 400 }
            );
        }

        // finduser
        const user = await getUserByEmail(email);

        //   hadle user jika tidak ada
        if (!user) {
            return NextResponse.json(
                { message: "invalid email" },
                { status: 400 }
            );
        }

        //   console.log(user, "user rote");
        const isValidPassword = comparePassword(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { message: "invalid account" },
                { status: 401 }
            );
        }

        const access_token = createToken({
            _id: user._id,
            email: user.email,
            username: user.username,
        });

        return NextResponse.json({ access_token }, { status: 200 });
    } catch (error) {
        return Response.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
