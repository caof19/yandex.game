import { render } from "@testing-library/react";
import { Topics } from ".";
import { BrowserRouter } from "react-router-dom";
const topicTestData = [
    {
        id: 0,
        title: "mechanical organizer monitored classic ea",
        message: "heard functions russia vb assigned",
        createDate: "2017-04-01T15:20:04.685Z",
        lastMessageDate: "2017-04-01T15:20:04.685Z",
        messagesCount: 10464,
        author: "username651651",
    },
];
it("Список тем форума рендерится без ошибок", () => {
    const { container } = render(Topics({ topics: topicTestData }), {
        wrapper: BrowserRouter,
    });
    expect(container).toMatchSnapshot();
});

it("Тестовые данные отрисовываются в списке тем форума", () => {
    const { getByText } = render(Topics({ topics: topicTestData }), {
        wrapper: BrowserRouter,
    });
    expect(getByText(topicTestData[0].title)).toBeTruthy();
});
