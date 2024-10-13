import { useEffect, useState, RefObject } from "react";
import { ColoredCell, COLORS, Grid } from "../filler";
const CELL_SIZE = 40;

import fillCellImage from "@/pages/Game/canvas/FillCell";
import { COLORS_TO_IMAGE } from "@/service/const";

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const useFillerCanvas = (
    rows: number,
    columns: number,
    canvasRef: RefObject<HTMLCanvasElement>,
) => {
    const generateGrid = (): Grid => {
        const grid: Grid = [];
        for (let row = 0; row < rows; row++) {
            const currentRow: ColoredCell[] = [];
            for (let col = 0; col < columns; col++) {
                currentRow.push({
                    row,
                    col,
                    color: getRandomColor(),
                    owner: "none",
                });
            }
            grid.push(currentRow);
        }
        return grid;
    };

    const [grid, setGrid] = useState<Grid>(generateGrid());

    /* Для создания кеша картинок, без него каждый ход картинки загружаются по новой и поле моргает */
    const [images, setImages] = useState<{ [key: string]: HTMLImageElement }>(
        {},
    );

    useEffect(() => {
        const colorCodes = Object.keys(COLORS_TO_IMAGE);
        const loadedImages: { [key: string]: HTMLImageElement } = {};

        let loadedCount = 0;
        colorCodes.forEach((colorCode) => {
            const src = COLORS_TO_IMAGE[colorCode];
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === colorCodes.length) {
                    setImages(loadedImages);
                }
            };
            loadedImages[colorCode] = img;
        });
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGrid(ctx, grid);
            }
        }
    }, [grid]);

    const drawGrid = (ctx: CanvasRenderingContext2D, grid: Grid) => {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 5000, 5000);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                fillCellImage(
                    col * CELL_SIZE,
                    row * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE,
                    grid[row][col].color,
                    ctx,
                    images,
                );
            }
        }
    };

    return { grid, setGrid };
};

export default useFillerCanvas;
