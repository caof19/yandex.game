import { render, RenderResult } from "@testing-library/react";
import { Comments } from ".";

describe("Комментарии", () => {
    let comments: RenderResult;
    const testComments = [
        {
            author: "Christensen Lynch",
            date: "Wed Sep 09 1970 18:49:41 GMT+0300 (Москва, стандартное время)",
            text: "Incididunt excepteur ex nulla magna adipisicing ipsum sunt eiusmod veniam nisi elit commodo aute. Commodo ea voluptate esse consequat.",
        },
    ];
    beforeEach(() => {
        comments = render(Comments({ comments: testComments }));
    });
    it("Список тем форума рендерится без ошибок", () => {
        expect(comments).toMatchSnapshot();
    });

    it("Тестовые данные отрисовываются", () => {
        expect(comments.getByText(testComments[0].author)).toBeTruthy();
    });
});
