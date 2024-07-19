import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();
const secret: string | undefined = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}
export type PayloadType = {
    _id: ObjectId | string;
    email: string;
    username: string;
    // Tambahkan properti lain yang diperlukan di dalam payload
};
export const createToken = (payload: PayloadType) => {
    let token = jwt.sign(payload, secret);
    return token;
};

export const verifyToken = (token: string) => {
    let payload = jwt.verify(token, secret);
    return payload;
};
