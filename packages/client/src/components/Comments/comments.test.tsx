import { render, RenderResult } from "@testing-library/react";
import { Comments, TComment } from ".";

describe.skip("Комментарии", () => {
    let comments: RenderResult;
    const testComments: TComment[] = [
        {
            id: 3,
            topic_id: 14,
            author: "Christensen Lynch",
            createdAt:
                "Wed Sep 09 1970 18:49:41 GMT+0300 (Москва, стандартное время)",
            text: "Incididunt excepteur ex nulla magna adipisicing ipsum sunt eiusmod veniam nisi elit commodo aute. Commodo ea voluptate esse consequat.",
            replies: [],
        },
    ];
    beforeEach(() => {
        comments = render(Comments({ comments: testComments, topic_id: 14 }));
    });
    it("Список тем форума рендерится без ошибок", () => {
        expect(comments).toMatchSnapshot();
    });

    it("Тестовые данные отрисовываются", () => {
        expect(comments.getByText(testComments[0].author)).toBeTruthy();
    });
});
