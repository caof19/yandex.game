import { Button } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useFillerCanvas from "./canvas/useCanvas";
import { GameProps } from ".";
import {
    checkIfConnected,
    COLORS,
    countGridOwner,
    getCell,
    moveOnGrid,
    OwnedCell,
} from "./gameHelpers";
import { COLORS_TO_IMAGE } from "@/service/const";
import { withFullscreenApi } from "@/service/hocs/withFullscreenApi";
import { addUserToLeaderboard } from "@/service/api/leaderboard";
import { useUsername } from "@/service/hook";

const CELL_SIZE = 40; // Размер одной ячейки
const ROWS = 12; // Количество строк
const COLS = 12; // Количество столбцов
const WIN_CONDITION = (ROWS * COLS) / 2;

// [row, column]
const playerStart = [ROWS - 1, 0];
const compStart = [0, COLS - 1];

const FillerGame = (props: GameProps) => {
    const { params, setGameState, restartGame } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { grid, setGrid } = useFillerCanvas(ROWS, COLS, canvasRef);

    const [playerColor, setCurrentColor] = useState<string>(
        getCell(playerStart[0], playerStart[1], grid).color,
    );
    const [computerColor, setComputerColor] = useState<string>(
        getCell(compStart[0], compStart[1], grid).color,
    );

    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const floodFill = useCallback(
        (
            oldColor: string,
            newColor: string,
            isPlayer: boolean,
            skipRender?: boolean,
        ) => {
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

                if (newCell.color === oldColor || newCell.color === newColor) {
                    const oldCell = getCell(row, col, grid);
                    if (oldCell.owner == owner && newCell.color === oldColor) {
                        newCell.color = newColor;
                    } else if (
                        newCell.color === newColor &&
                        checkIfConnected(newGrid, row, col, owner)
                    ) {
                        newCell.owner = owner;
                    }

                    moveOnGrid(row, col, fillQueue, ROWS, COLS);
                }
            }

            if (!skipRender) {
                setGrid(newGrid);
            }
            return countGridOwner(newGrid, owner);
        },
        [grid],
    );

    const [playerCells, setPlayerCells] = useState(() =>
        countGridOwner(grid, "player"),
    );
    const [computerCells, setComputerCells] = useState(() =>
        countGridOwner(grid, "comp"),
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

    const username = useUsername();

    const onEndingGame = async () => {
        username && addUserToLeaderboard(username);
    };

    useEffect(() => {
        if (computerCells > WIN_CONDITION || playerCells > WIN_CONDITION) {
            const isWinner = playerCells > WIN_CONDITION;
            setGameState({ condition: "end", params: { ...params, isWinner } });
            isWinner && onEndingGame();
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
            <Button onClick={restartGame}>Начать заново</Button>
        </div>
    );
};

export default withFullscreenApi(FillerGame);
