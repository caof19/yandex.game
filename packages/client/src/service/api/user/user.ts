import { API } from "..";
import { ChangePasswordArgs, ChangeProfileArgs } from "./types";

export function changePassword(data: ChangePasswordArgs) {
    return API.put("/user/password", data);
}

export function changeProfile(data: ChangeProfileArgs) {
    return API.put("/user/profile", data);
}

export function changeAvatar(data: FormData) {
    return API.put("/user/profile/avatar", data);
}
