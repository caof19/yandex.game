import { fireEvent, render, RenderResult } from "@testing-library/react";
import FillerGame from "./filler";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("Компонент игры", () => {
    let fillerGame: RenderResult;
    beforeEach(() => {
        fillerGame = render(
            <FillerGame params={{}} setGameState={console.log} />,
            { wrapper: ({ children }) => Provider({ store: store, children }) },
        );
    });
    it("рендерится без ошибок", () => {
        expect(fillerGame.getByText("Ход игрока")).toBeTruthy();
    });
    it("при клике на кнопку выбора цвета ход переходит компьютеру", () => {
        const button = fillerGame.getAllByRole("button");
        fireEvent.click(button[0]);
        expect(fillerGame.getByText("Ход компьютера")).toBeTruthy();
    });

    it("после компьютера, ход переходит к игроку", () => {
        const button = fillerGame.getAllByRole("button");
        fireEvent.click(button[0]);
        setTimeout(() => {
            expect(fillerGame.getByText("Ход игрока")).toBeTruthy();
        }, 1000);
    });
});
