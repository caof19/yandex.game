import * as renderer from "react-test-renderer";
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
it("Лидерборд рендерится без ошибок", () => {
    const tree = renderer
        .create(LeaderBoardList({ list: leaderBoardTestData }))
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Тестовые данные отрисовываются в компоненте", () => {
    const { getByText } = render(
        LeaderBoardList({ list: leaderBoardTestData }),
    );
    expect(getByText("user001")).toBeTruthy();
});
