import { z } from "zod";
// validation
export const userShema = z.object({
    name: z.string({ message: "name is required" }),
    username: z.string({ message: "username is required" }),
    email: z
        .string({ message: "email is required" })
        .email({ message: "email format is not valid" }),
    password: z
        .string({ message: "password is required" })
        .min(5, { message: "Password must be at least 5 characters" }),
});

export const addWhisListValidate = z.object({
    userId: z
        .string({ message: "user id is required" })
        .min(1, { message: "user id is required" }),
    productId: z
        .string({ message: "product id is required" })
        .min(1, { message: "product id is required" }),
});
