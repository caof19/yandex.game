import { render } from "@testing-library/react";
import { Topics, TTopic } from ".";
import { BrowserRouter } from "react-router-dom";
const topicTestData: TTopic[] = [
    {
        id: 0,
        title: "mechanical organizer monitored classic ea",
        text: "heard functions russia vb assigned",
        createdAt: "2017-04-01T15:20:04.685Z",
        author: "username651651",
        comments: [],
        reactions: [],
    },
];
it.skip("Список тем форума рендерится без ошибок", () => {
    const { container } = render(
        Topics({
            topics: topicTestData,
            setUpdate: () => {
                console.log();
            },
        }),
        {
            wrapper: BrowserRouter,
        },
    );
    expect(container).toMatchSnapshot();
});

it.skip("Тестовые данные отрисовываются в списке тем форума", () => {
    const { getByText } = render(
        Topics({
            topics: topicTestData,
            setUpdate: () => {
                console.log();
            },
        }),
        {
            wrapper: BrowserRouter,
        },
    );
    expect(getByText(topicTestData[0].title)).toBeTruthy();
});
