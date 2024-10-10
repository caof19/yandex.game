import { COLORS_TO_IMAGE } from "@/service/const";

export default function fillCellImage(
    x: number,
    y: number,
    width: number,
    height: number,
    colorCode: string,
    ctx: CanvasRenderingContext2D,
    images: { [key: string]: HTMLImageElement },
) {
    const base_image = images[colorCode];
    if (base_image) {
        ctx.drawImage(base_image, x, y, width, height);
    } else {
        const img = new Image();
        img.src = COLORS_TO_IMAGE[colorCode];
        img.onload = () => {
            ctx.drawImage(img, x, y, width, height);
        };
    }
}
