export type Owner = "player" | "comp" | "none";

export type Cell = {
    row: number;
    col: number;
};

export type OwnedCell = Cell & {
    owner: Owner;
};

export interface ColoredCell extends OwnedCell {
    color: string;
}

export type Grid = ColoredCell[][];

// Возможные цвета
export const COLORS = [
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#FFD700",
    "#6A5ACD",
    "#FF1493",
];

export const getRandomColor = () =>
    COLORS[Math.floor(Math.random() * COLORS.length)];

export const getCell = (row: number, column: number, fnGrid: Grid) =>
    fnGrid[row]?.[column];

export const countGridOwner = (grid: Grid, owner: Exclude<Owner, "none">) =>
    grid.reduce((acc, curr) => {
        const items = curr.filter((x) => x.owner == owner).length;
        return acc + items;
    }, 0);

export const checkIfConnected = (
    grid: Grid,
    row: number,
    column: number,
    owner: Owner,
) => {
    const top = getCell(row - 1, column, grid)?.owner;
    const left = getCell(row, column - 1, grid)?.owner;
    const right = getCell(row, column + 1, grid)?.owner;
    const bot = getCell(row + 1, column, grid)?.owner;

    return top === owner || left === owner || right === owner || bot === owner;
};

export const moveOnGrid = (
    row: number,
    col: number,
    queue: OwnedCell[],
    maxRows: number,
    maxCols: number,
) => {
    if (row > 0) queue.push({ row: row - 1, col, owner: "none" });
    if (row < maxRows - 1) queue.push({ row: row + 1, col, owner: "none" });
    if (col > 0) queue.push({ row, col: col - 1, owner: "none" });
    if (col < maxCols - 1) queue.push({ row, col: col + 1, owner: "none" });
};

export const setOwner = (
    grid: Grid,
    owner: Exclude<Owner, "none">,
    columns: number,
    rows: number,
) => {
    const start = owner === "player" ? [rows - 1, 0] : [0, columns - 1];
    const color = getCell(start[0], start[1], grid).color;
    const fillQueue: OwnedCell[] = [
        { row: start[0], col: start[1], owner: owner },
    ];

    const visited = new Set<string>();
    while (fillQueue.length > 0) {
        const { row, col } = fillQueue.pop()!;
        const key = `${row},${col}`;

        if (visited.has(key)) continue;
        visited.add(key);

        const cell = getCell(row, col, grid);

        if (cell.color === color) {
            cell.owner = owner;
            moveOnGrid(row, col, fillQueue, rows, columns);
        }
    }

    return grid;
};
