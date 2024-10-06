import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import useFillerCanvas from "./canvas/useCanvas";

const CELL_SIZE = 40; // Размер одной ячейки
const ROWS = 12; // Количество строк
const COLS = 12; // Количество столбцов
const WIN_CONDITION = ROWS * COLS;

export const playerStart = [ROWS - 1, 0];
export const compStart = [0, COLS - 1];
export const COLORS = [
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#FFD700",
    "#6A5ACD",
    "#FF1493",
]; // Возможные цвета

type Owner = "player" | "comp" | "none";

type Cell = {
    row: number;
    col: number;
};
type OwnedCell = Cell & {
    owner: Owner;
};
export interface ColoredCell extends OwnedCell {
    color: string;
}

const isSameColor = (
    grid: ColoredCell[][],
    row: number,
    col: number,
    color: string,
): boolean => {
    return grid[row]?.[col]?.color === color;
};

const FillerGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { grid, setGrid } = useFillerCanvas(ROWS, COLS, canvasRef);
    const [currentColor, setCurrentColor] = useState<string>(
        grid[playerStart[0]][playerStart[1]].color,
    );
    const [computerColor, setComputerColor] = useState<string>(
        grid[compStart[0]][compStart[1]].color,
    );

    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const floodFill = (
        targetColor: string,
        replacementColor: string,
        isPlayer: boolean,
        skipRender?: boolean,
    ): number => {
        const row = isPlayer ? playerStart[0] : compStart[0];
        const col = isPlayer ? playerStart[1] : compStart[1];

        const newGrid = [...grid];
        const fillQueue: OwnedCell[] = [
            { row, col, owner: isPlayer ? "player" : "comp" },
        ];
        console.log("start");
        const visited = new Set<string>();
        while (fillQueue.length > 0) {
            const { row, col } = fillQueue.pop()!;
            const key = `${row},${col}`;

            if (visited.has(key)) continue;

            visited.add(key);
            const newCell = newGrid[row][col];
            if (isSameColor(grid, row, col, targetColor)) {
                newCell.owner = isPlayer ? "player" : "comp";
                newCell.color = replacementColor;
                if (row > 0)
                    fillQueue.push({ row: row - 1, col, owner: "none" });
                if (row < ROWS - 1)
                    fillQueue.push({ row: row + 1, col, owner: "none" });
                if (col > 0)
                    fillQueue.push({ row, col: col - 1, owner: "none" });
                if (col < COLS - 1)
                    fillQueue.push({ row, col: col + 1, owner: "none" });
            } else if (isSameColor(grid, row, col, replacementColor)) {
                newCell.owner = isPlayer ? "player" : "comp";
            }

            // } else if (isSameColor(grid, row, col, replacementColor)) {
            // newCell.owner = isPlayer ? "player" : "comp";
            // }
        }
        console.log("end");

        if (!skipRender) {
            setGrid(newGrid);
        }

        const result = grid.reduce((acc, curr) => {
            const items = curr.filter(
                (x) => x.owner == (isPlayer ? "player" : "comp"),
            ).length;
            return acc + items;
        }, 0);
        console.log(result);
        return result;
    };

    const [playerCells, setPlayerCells] = useState(
        floodFill(currentColor, currentColor, true, true),
    );
    const [computerCells, setComputerCells] = useState(
        floodFill(computerColor, computerColor, false, true),
    );

    // Ход компьютера
    const computerMove = () => {
        const availableColors = COLORS.filter(
            (color) => color !== computerColor && color !== currentColor,
        );

        const colors: { [key: string]: number } = {};
        for (const color of availableColors) {
            const potentialCaptured = floodFill(
                computerColor,
                color,
                false,
                true,
            );
            colors[color] = potentialCaptured;
        }

        const bestColor = Object.entries(colors).sort(
            (a, b) => b[1] - a[1],
        )[0][0];

        const newlyCapturedCells = floodFill(computerColor, bestColor, false);
        setComputerColor(bestColor);

        setComputerCells(newlyCapturedCells);
        setIsPlayerTurn(true);
    };

    const playerMove = (color: string) => {
        if (!isPlayerTurn || color === computerColor) return;

        const newlyCapturedCells = floodFill(currentColor, color, true);

        console.log("player cells : " + newlyCapturedCells);
        setCurrentColor(color);
        setPlayerCells(newlyCapturedCells);
        setIsPlayerTurn(false);
    };

    useEffect(() => {
        if (computerCells > WIN_CONDITION || playerCells > WIN_CONDITION) {
            // finish game
        }

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
                        color !== computerColor &&
                        color !== currentColor && (
                            <Button
                                key={color}
                                onClick={() => playerMove(color)}
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
