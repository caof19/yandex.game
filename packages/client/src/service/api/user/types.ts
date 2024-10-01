import { User } from "./models";

export interface ChangePasswordArgs {
    oldPassword: string;
    newPassword: string;
}

export type ChangeProfileArgs = Pick<
    User,
    "email" | "display_name" | "first_name" | "login" | "phone" | "second_name"
>;
