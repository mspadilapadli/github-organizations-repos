import { userShema } from "@/validators/user.validator";
import {
    addUser,
    getUserByEmail,
    getUserByUsername,
} from "@/app/db/models/user";
import { z } from "zod";

export const POST = async (request: Request) => {
    const body = await request.json();

    try {
        // * Validation
        const dataValid = userShema.parse(body);

        // validation manual uniq email dan username
        const userByEmail = await getUserByEmail(body.email);

        // !harusnya error handler
        if (userByEmail) {
            return Response.json({ message: "email must be unique " });
        }

        const findUsername = await getUserByUsername(body.username);

        if (findUsername) {
            return Response.json({ message: "username must be unique" });
        }

        const user = await addUser(dataValid);

        return Response.json(
            { message: "user has been created", user },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return Response.json({ message: error.errors }, { status: 400 });
        }
        return Response.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
