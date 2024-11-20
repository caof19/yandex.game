import { YandexApi } from "..";
import { ChangePasswordArgs, ChangeProfileArgs } from "./types";

export function changePassword(data: ChangePasswordArgs) {
    return YandexApi.put("/user/password", data);
}

export function changeProfile(data: ChangeProfileArgs) {
    return YandexApi.put("/user/profile", data);
}

export function changeAvatar(data: FormData) {
    return YandexApi.put("/user/profile/avatar", data);
}
