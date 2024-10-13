import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { Flex, FloatButton } from "antd";
import { FC, useRef, useState } from "react";

export const withFullscreenApi = <T extends object>(WrappedBlock: FC<T>) => {
    const Wrapper = (props: T) => {
        const [isFullscreenActive, setFullscreen] = useState(false);
        const fullscreenRef = useRef<HTMLDivElement>(null);
        const handleClick = () => {
            if (!isFullscreenActive) {
                fullscreenRef.current?.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
            setFullscreen(!isFullscreenActive);
        };
        return (
            <Flex
                justify="center"
                align="center"
                ref={fullscreenRef}
                style={{ backgroundColor: "#ffffff" }}
            >
                <WrappedBlock {...props} />
                <FloatButton
                    onClick={handleClick}
                    icon={
                        isFullscreenActive ? (
                            <FullscreenExitOutlined />
                        ) : (
                            <FullscreenOutlined />
                        )
                    }
                />
            </Flex>
        );
    };
    return Wrapper;
};
