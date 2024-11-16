import { ChangePasswordForm, ProfileAvatar, ProfileInfo } from "@/components";
import { BASE_URL } from "@/service/api/config";
import {
    ChangePasswordArgs,
    ChangeProfileArgs,
    changePassword,
    changeProfile,
} from "@/service/api/user";
import { Button, Flex, Upload, message } from "antd/lib";
import { RcFile } from "antd/lib/upload";
import { useState } from "react";
import styles from "./style.module.css";

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";

    if (!isJpgOrPng) {
        message.error("You can only upload JPG/JPEG/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < 15;

    if (!isLt2M) {
        message.error("Image must smaller than 15MB!");
    }

    return isJpgOrPng && isLt2M;
};

export function Profile() {
    const [isEdit, setIsEdit] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);

    const onSubmitChangePasswordForm = async (data: ChangePasswordArgs) => {
        await changePassword(data);
    };

    const onSubmitChangeProfileForm = async (data: ChangeProfileArgs) => {
        await changeProfile(data);
    };

    return (
        <Flex gap="middle" vertical className={styles.container}>
            <Flex justify="center">
                <ProfileAvatar />
            </Flex>
            <Flex vertical gap="middle">
                {isChangePassword ? (
                    <ChangePasswordForm
                        onSubmit={onSubmitChangePasswordForm}
                        onCancel={() => {
                            setIsChangePassword(false);
                        }}
                    />
                ) : (
                    <ProfileInfo
                        isEdit={isEdit}
                        onSubmit={onSubmitChangeProfileForm}
                        onCancelEdit={() => setIsEdit(false)}
                    />
                )}
            </Flex>
            {!isChangePassword && !isEdit && (
                <Flex vertical gap="middle">
                    <Button onClick={() => setIsEdit(true)}>
                        Редактировать
                    </Button>
                    <Button onClick={() => setIsChangePassword(true)}>
                        Изменить пароль
                    </Button>
                    <Upload
                        name="avatar"
                        withCredentials
                        method="PUT"
                        action={`${BASE_URL}/user/profile/avatar`}
                        beforeUpload={beforeUpload}
                    >
                        <Button>Изменить аватар</Button>
                    </Upload>
                </Flex>
            )}
        </Flex>
    );
}
