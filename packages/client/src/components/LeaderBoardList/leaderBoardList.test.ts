import { render } from "@testing-library/react";
import { LeaderBoardList } from ".";
const leaderBoardTestData = [
    {
        id: 5118,
        position: 1,
        username: "user001",
        score: 1000,
    },
];
describe("Лидерборд", () => {
    it("Лидерборд рендерится без ошибок", () => {
        const { container } = render(
            LeaderBoardList({ list: leaderBoardTestData }),
        );
        expect(container).toMatchSnapshot();
    });

    it("Тестовые данные отрисовываются в компоненте лидерборда", () => {
        const { getByText } = render(
            LeaderBoardList({ list: leaderBoardTestData }),
        );
        expect(getByText("user001")).toBeTruthy();
    });
});
