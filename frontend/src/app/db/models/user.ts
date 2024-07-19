import { hashPassword } from "@/app/helpers/bcrypt";
import { getMongoDbInstance } from "../config";
import { ObjectId } from "mongodb";

export type User = {
    name: string;
    username: string;
    email: string;
    password: string;
};

export const getDb = async () => {
    const client = await getMongoDbInstance();
    const db = client.db("buybuy-app");
    return db;
};
export const getUsers = async () => {
    const db = await getDb();
    return await db
        .collection<User>("User")
        .find()
        .project({ password: 0 })
        .toArray();
};

export const getUserById = async (id: string | ObjectId) => {
    const db = await getDb();

    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    return await db.collection<User>("User").findOne(
        { _id: objectId },
        {
            projection: { password: 0 },
        }
    );
};

export const getUserByEmail = async (email: string) => {
    const db = await getDb();

    return await db.collection<User>("User").findOne({ email });
};

export const getUserByUsername = async (username: string) => {
    const db = await getDb();

    return await db.collection<User>("User").findOne(
        { username },
        {
            projection: { password: 0 },
        }
    );
};

export const addUser = async (newUser: User) => {
    const db = await getDb();

    newUser.password = hashPassword(newUser.password);
    const { insertedId } = await db.collection<User>("User").insertOne(newUser);

    return await getUserById(insertedId);
};
