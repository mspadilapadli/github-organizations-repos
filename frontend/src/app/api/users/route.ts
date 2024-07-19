import { getUsers } from "@/app/db/models/user";
export const dynamic = "force-dynamic";

export const GET = async () => {
    const users = await getUsers();
    return Response.json(users);
};
