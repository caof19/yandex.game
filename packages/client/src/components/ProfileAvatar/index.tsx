import { getResourceByPath } from "@/service/api/resource";
import { useAppSelector } from "@/service/hook";
import { WarningOutlined } from "@ant-design/icons/lib";
import { Avatar, Empty, Skeleton } from "antd/lib";
import { useEffect, useState } from "react";

export function ProfileAvatar() {
    const user = useAppSelector((state) => state.auth.user);

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.avatar) return;

        setIsLoading(true);

        getResourceByPath(user.avatar, { responseType: "blob" })
            .then((res) => {
                const image = URL.createObjectURL(res.data);
                setImageUrl(image);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [user?.avatar]);

    if (!user?.avatar) {
        return (
            <Avatar
                size={100}
                icon={<Empty imageStyle={{ width: 60, height: 60 }} />}
            />
        );
    }

    if (error) {
        return <Avatar size={100} icon={<WarningOutlined />} />;
    }

    if (isLoading) {
        return (
            <Avatar size={100} icon={<Skeleton.Avatar size={100} active />} />
        );
    }

    return <Avatar src={imageUrl} size={100} />;
}
