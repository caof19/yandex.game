import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import useFillerCanvas from "./canvas/useCanvas";
import { COLORS_TO_IMAGE } from "@/service/const";
import { withFullscreenApi } from "@/service/hocs/withFullscreenApi";

const CELL_SIZE = 40; // Размер одной ячейки
const ROWS = 12; // Количество строк
const COLS = 12; // Количество столбцов
const WIN_CONDITION = ROWS * COLS;

// [row, column]
const playerStart = [ROWS - 1, 0];
const compStart = [0, COLS - 1];

// Возможные цвета
export const COLORS = [
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#FFD700",
    "#6A5ACD",
    "#FF1493",
];

const moveOnGrid = (row: number, col: number, queue: OwnedCell[]) => {
    if (row > 0) queue.push({ row: row - 1, col, owner: "none" });
    if (row < ROWS - 1) queue.push({ row: row + 1, col, owner: "none" });
    if (col > 0) queue.push({ row, col: col - 1, owner: "none" });
    if (col < COLS - 1) queue.push({ row, col: col + 1, owner: "none" });
};

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
export type Grid = ColoredCell[][];

const isSameColor = (
    grid: Grid,
    row: number,
    col: number,
    color: string,
): boolean => {
    return grid[row]?.[col]?.color === color;
};

const getCell = (row: number, column: number, fnGrid: Grid) =>
    fnGrid[row][column];

const FillerGame = (props: { name?: string }) => {
    const { name } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { grid, setGrid } = useFillerCanvas(ROWS, COLS, canvasRef);

    const [playerColor, setCurrentColor] = useState<string>(
        getCell(playerStart[0], playerStart[1], grid).color,
    );
    const [computerColor, setComputerColor] = useState<string>(
        getCell(compStart[0], compStart[1], grid).color,
    );

    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    function floodFill(
        oldColor: string,
        newColor: string,
        isPlayer: boolean,
        skipRender?: boolean,
    ): number {
        const [row, col] = isPlayer ? playerStart : compStart;
        const owner = isPlayer ? "player" : "comp";
        const newGrid = grid.map((x) => x.map((y) => ({ ...y })));
        const fillQueue: OwnedCell[] = [{ row, col, owner: owner }];

        const visited = new Set<string>();
        while (fillQueue.length > 0) {
            const { row, col } = fillQueue.pop()!;
            const key = `${row},${col}`;

            if (visited.has(key)) continue;
            visited.add(key);

            const newCell = getCell(row, col, newGrid);

            if (
                isSameColor(newGrid, row, col, oldColor) ||
                isSameColor(newGrid, row, col, newColor)
            ) {
                newCell.owner = owner;
                newCell.color = newColor;
                moveOnGrid(row, col, fillQueue);
            }
        }

        if (!skipRender) {
            setGrid(newGrid);
        }

        return newGrid.reduce((acc, curr) => {
            const items = curr.filter((x) => x.owner == owner).length;
            return acc + items;
        }, 0);
    }

    const [playerCells, setPlayerCells] = useState(
        floodFill(playerColor, playerColor, true, true),
    );
    const [computerCells, setComputerCells] = useState(
        floodFill(computerColor, computerColor, false, true),
    );

    const computerMove = () => {
        const availableColors = COLORS.filter(
            (color) => color !== computerColor && color !== playerColor,
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

        const newlyCapturedCells = floodFill(playerColor, color, true);

        setCurrentColor(color);
        setPlayerCells(newlyCapturedCells);
        setIsPlayerTurn(false);
    };

    useEffect(() => {
        if (computerCells > WIN_CONDITION || playerCells > WIN_CONDITION) {
            // TODO: finish game
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
                        color !== playerColor && (
                            <Button
                                key={color}
                                onClick={() => playerMove(color)}
                                style={{
                                    backgroundColor: color,
                                    backgroundImage: `url(${COLORS_TO_IMAGE[color]})`,
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
            <div>{name ?? "Игрок"}</div>
        </div>
    );
};

export default withFullscreenApi(FillerGame);
