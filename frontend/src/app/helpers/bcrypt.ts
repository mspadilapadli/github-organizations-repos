import { hashSync, compareSync } from "bcryptjs";

export const hashPassword = (password: string) => {
    return hashSync(password);
};
export const comparePassword = (passwordInput: string, passwordDB: string) => {
    return compareSync(passwordInput, passwordDB);
};
