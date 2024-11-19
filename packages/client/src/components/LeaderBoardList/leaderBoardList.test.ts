import { render } from "@testing-library/react";
import { LeaderBoardList } from ".";
import { store } from "../../store";
import { Provider } from "react-redux";
const leaderBoardTestData = [
    {
        data: {
            position: 1,
            username: "user001",
            peachFillerScore: 1000,
        },
    },
];
describe("Лидерборд", () => {
    it("Лидерборд рендерится без ошибок", () => {
        const { container } = render(
            LeaderBoardList({ list: leaderBoardTestData }),
            {
                wrapper: ({ children }) => Provider({ store: store, children }),
            },
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
