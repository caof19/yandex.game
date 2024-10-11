import React, {
    Dispatch,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from "react";
import FillerGame from "./filler";
import { StartScreen } from "./startScreen";
import { EndScreen } from "./endScreen";

export type GameParams = {
    userName?: string;
    isWinner?: boolean;
};

export type GameState = {
    condition: "start" | "game" | "end";
    params?: GameParams;
};

export type GameProps = {
    setGameState: Dispatch<React.SetStateAction<GameState>>;
    params: GameParams;
    restartGame?(): void;
};

export const Game = () => {
    const [gameState, setGameState] = useState<GameState>({
        condition: "start",
    });
    const [gameKey, nextGameKey] = useReducer((x) => x + 1, 0);

    const render = useMemo(() => {
        switch (gameState.condition) {
            case "start": {
                return <StartScreen setGameState={setGameState} />;
            }
            case "game": {
                return (
                    <FillerGame
                        key={gameKey}
                        params={gameState.params!}
                        setGameState={setGameState}
                        restartGame={nextGameKey}
                    />
                );
            }
            case "end": {
                return (
                    <EndScreen
                        params={gameState.params!}
                        setGameState={setGameState}
                    />
                );
            }
        }
    }, [gameState, gameKey]);

    return render;
};
