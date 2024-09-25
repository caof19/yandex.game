import React, { useEffect, useRef, useState } from "react";

const CELL_SIZE = 40; // Размер одной ячейки
const ROWS = 12; // Количество строк
const COLS = 12; // Количество столбцов
const COLORS = [
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#FFD700",
    "#6A5ACD",
    "#FF1493",
]; // Возможные цвета

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

type Owner = "player" | "comp" | "none";

type Cell = {
    row: number;
    col: number;
    owner: Owner;
};

interface ColoredCell extends Cell {
    color: string;
}

const generateGrid = (): ColoredCell[][] => {
    const grid: ColoredCell[][] = [];
    for (let row = 0; row < ROWS; row++) {
        const currentRow: ColoredCell[] = [];
        for (let col = 0; col < COLS; col++) {
            currentRow.push({
                row,
                col,
                color: getRandomColor(),
                owner:
                    row === ROWS - 1 && col === 0
                        ? "player"
                        : row === 0 && col === COLS - 1
                        ? "comp"
                        : "none",
            });
        }
        grid.push(currentRow);
    }
    return grid;
};

const isSameColor = (
    grid: ColoredCell[][],
    row: number,
    col: number,
    color: string,
): boolean => {
    return grid[row] && grid[row][col] && grid[row][col].color === color;
};

const FillerGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [grid, setGrid] = useState<ColoredCell[][]>(generateGrid);
    const [currentColor, setCurrentColor] = useState<string>(
        grid[ROWS - 1][0].color,
    ); // Нижний левый угол
    const [computerColor, setComputerColor] = useState<string>(
        grid[0][COLS - 1].color,
    ); // Для компьютера верхний правый угол
    const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Текущий ход (true - ход игрока, false - компьютер)
    const [playerCells, setPlayerCells] = useState(1);
    const [computerCells, setComputerCells] = useState(1);

    const drawGrid = (ctx: CanvasRenderingContext2D, grid: ColoredCell[][]) => {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
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

    const floodFill = (
        row: number,
        col: number,
        targetColor: string,
        replacementColor: string,
        isPlayer: boolean,
    ): number => {
        if (
            targetColor === replacementColor ||
            !isSameColor(grid, row, col, targetColor)
        )
            return 0;

        const newGrid = [...grid];
        const cell = grid[row][col];
        const fillQueue: Cell[] = [{ row, col, owner: cell.owner }];

        while (fillQueue.length > 0) {
            const { row, col } = fillQueue.pop()!;
            if (isSameColor(grid, row, col, targetColor)) {
                const newCell = newGrid[row][col];
                newCell.color = replacementColor;
                newCell.owner = isPlayer ? "player" : "comp";

                if (row > 0)
                    fillQueue.push({ row: row - 1, col, owner: "none" });
                if (row < ROWS - 1)
                    fillQueue.push({ row: row + 1, col, owner: "none" });
                if (col > 0)
                    fillQueue.push({ row, col: col - 1, owner: "none" });
                if (col < COLS - 1)
                    fillQueue.push({ row, col: col + 1, owner: "none" });
            } else if (isSameColor(grid, row, col, replacementColor)) {
                newGrid[row][col].owner = isPlayer ? "player" : "comp";
            }
        }

        setGrid(newGrid);

        return newGrid.reduce((acc, curr) => {
            const items = curr.filter(
                (x) => x.owner == (isPlayer ? "player" : "comp"),
            ).length;
            console.log(curr, items, acc);
            return acc + items;
        }, 0);
    };

    const countCapturedCells = (
        color: string,
        row: number,
        col: number,
    ): number => {
        // TODO: подсчет захватываемых ячеек
        return 0;
    };

    // Ход компьютера
    const computerMove = () => {
        const availableColors = COLORS.filter(
            (color) => color !== computerColor && color !== currentColor,
        );

        let bestColor = computerColor;
        let maxCapturedCells = 0;

        // TODO: выбор лучшего цвета для хода компьютера
        for (const color of availableColors) {
            const potentialCaptured = countCapturedCells(color, 0, COLS - 1);
            if (potentialCaptured > maxCapturedCells) {
                maxCapturedCells = potentialCaptured;
                bestColor = color;
            }
        }

        const newlyCapturedCells = floodFill(
            0,
            COLS - 1,
            computerColor,
            bestColor,
            false,
        );
        setComputerColor(bestColor);

        setComputerCells(newlyCapturedCells);
        setIsPlayerTurn(true);
    };

    const handleColorChange = (color: string) => {
        if (!isPlayerTurn || color === computerColor) return;

        const newlyCapturedCells = floodFill(
            ROWS - 1,
            0,
            currentColor,
            color,
            true,
        );

        setCurrentColor(color);
        setPlayerCells(newlyCapturedCells);
        setIsPlayerTurn(false);
    };

    useEffect(() => {
        if (!isPlayerTurn) {
            const timer = setTimeout(computerMove, 1000);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn]);

    return (
        <div>
            <div>{isPlayerTurn ? "Ход игрока" : "Ход компьютера"}</div>
            <canvas
                ref={canvasRef}
                width={COLS * CELL_SIZE}
                height={ROWS * CELL_SIZE}
                style={{ border: "1px solid black" }}
            />
            <div style={{ marginTop: "20px" }}>
                {COLORS.map(
                    (color) =>
                        color !== computerColor && (
                            <button
                                key={color}
                                onClick={() => handleColorChange(color)}
                                style={{
                                    backgroundColor: color,
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "10px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                disabled={!isPlayerTurn}
                            />
                        ),
                )}
            </div>

            <div style={{ marginTop: "20px" }}>
                <p>Захваченные ячейки игрока: {playerCells}</p>
                <p>Захваченные ячейки компьютера: {computerCells}</p>
            </div>
        </div>
    );
};

export default FillerGame;
