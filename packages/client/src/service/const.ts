import orangeSprite from "/public/sprites/orange.svg";
import seaSprite from "/public/sprites/seaColor.svg";
import greenSprite from "/public/sprites/green.svg";
import yellowSprite from "/public/sprites/yellow.svg";
import purpleSprite from "/public/sprites/purple.svg";
import pinkSprite from "/public/sprites/pink.svg";

export type TColorsToImage = {
    [key: string]: string;
};

export const COLORS_TO_IMAGE: TColorsToImage = {
    "#FF6347": orangeSprite,
    "#4682B4": seaSprite,
    "#32CD32": greenSprite,
    "#FFD700": yellowSprite,
    "#6A5ACD": purpleSprite,
    "#FF1493": pinkSprite,
};

export const REDIRECT_URI =
    process.env.YA_REDIRECT_URI || "http://localhost:3000/login";

export const OAUTH_URL =
    "https://oauth.yandex.ru/authorize?response_type=code&client_id=%CLIENT_ID%&redirect_uri=" +
    REDIRECT_URI;
