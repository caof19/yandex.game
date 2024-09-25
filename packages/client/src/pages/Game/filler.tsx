import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";

const CELL_SIZE = 40; // Размер одной ячейки
const ROWS = 12; // Количество строк
const COLS = 12; // Количество столбцов
const playerStart = [ROWS - 1, 0];
const compStart = [0, COLS - 1];
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
                    row === playerStart[0] && playerStart[1]
                        ? "player"
                        : row === compStart[0] && col === compStart[1]
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
        grid[playerStart[0]][playerStart[1]].color,
    );
    const [computerColor, setComputerColor] = useState<string>(
        grid[compStart[0]][compStart[1]].color,
    );
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
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
            return acc + items;
        }, 0);
    };

    const countCapturedCells = (
        row: number,
        col: number,
        targetColor: string,
        replacementColor: string,
    ): number => {
        let count = 0;
        const visited = new Set<string>(); // Множество для отслеживания посещённых клеток
        const fillQueue: Cell[] = [{ row, col, owner: "none" }];

        while (fillQueue.length > 0) {
            const { row, col } = fillQueue.pop()!;
            const key = `${row},${col}`; // Уникальный ключ для клетки (координаты)

            // Пропускаем клетку, если она уже была посещена
            if (visited.has(key)) continue;
            visited.add(key);

            // Если цвет клетки совпадает с целевым или новым цветом, увеличиваем счётчик
            if (
                isSameColor(grid, row, col, targetColor) ||
                isSameColor(grid, row, col, replacementColor)
            ) {
                count++;

                // Добавляем соседние клетки в очередь, если они ещё не посещены
                if (row > 0)
                    fillQueue.push({ row: row - 1, col, owner: "none" });
                if (row < ROWS - 1)
                    fillQueue.push({ row: row + 1, col, owner: "none" });
                if (col > 0)
                    fillQueue.push({ row, col: col - 1, owner: "none" });
                if (col < COLS - 1)
                    fillQueue.push({ row, col: col + 1, owner: "none" });
            }
        }

        return count; // Возвращаем количество захваченных клеток
    };

    // Ход компьютера
    const computerMove = () => {
        const availableColors = COLORS.filter(
            (color) => color !== computerColor && color !== currentColor,
        );

        const colors: { [key: string]: number } = {};
        for (const color of availableColors) {
            const potentialCaptured = countCapturedCells(
                0,
                COLS - 1,
                computerColor,
                color,
            );
            colors[color] = potentialCaptured;
        }

        const bestColor = Object.entries(colors).sort((a, b) =>
            a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0,
        )[0][0];

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
                            <Button
                                key={color}
                                onClick={() => handleColorChange(color)}
                                style={{
                                    backgroundColor: color,
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "10px",
                                    border: "none",
                                    cursor: isPlayerTurn ? "pointer" : "auto",
                                }}
                                disabled={!isPlayerTurn}
                            />
                        ),
                )}
            </div>
            <div>
                <p>Захваченные ячейки игрока: {playerCells}</p>
                <p>Захваченные ячейки компьютера: {computerCells}</p>
            </div>
        </div>
    );
};

export default FillerGame;
