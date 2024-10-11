import { useEffect, useState, RefObject } from "react";
import { ColoredCell, COLORS, Grid } from "../filler";
const CELL_SIZE = 40;

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
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                ctx.fillStyle = grid[row][col].color;
                ctx.fillRect(
                    col * CELL_SIZE,
                    row * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE,
                );
                ctx.strokeRect(
                    col * CELL_SIZE,
                    row * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE,
                );
            }
        }
    };

    return { grid, setGrid };
};

export default useFillerCanvas;
