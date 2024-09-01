import { Todo } from "./todo";
describe("Todo", () => {
    it(`1=1`, () => {
        expect(1).toBe(1);
    });

    describe("建立待辦事項", () => {
        it(`建立成功`, () => {
            const todo = new Todo({
                description: "吃飯",
                startTime: new Date("2024-08-24 18:00:00"),
                endTime: new Date("2024-08-24 23:59:00"),
                category: "dinner"
            });

            expect(todo.description).toBe("吃飯");
            expect(todo.startTime).toEqual(new Date("2024-08-24 18:00:00"));
            expect(todo.endTime).toEqual(new Date("2024-08-24 23:59:00"));
            expect(todo.category).toBe("dinner");
            expect(todo.status).toBe("todo");
            expect(todo.isDeleted).toBe(false);
        });
        it(`開始時間晚於結束時間，建立失敗`, () => {
            expect(() => {
                new Todo({
                    description: "吃飯",
                    startTime: new Date("2024-08-24 23:59:00"),
                    endTime: new Date("2024-08-24 18:00:00"),
                    category: "dinner"
                });
            }).toThrowError("待辦事項結束時間不可早於開始時間");
        });
    });

    describe("修改待辦事項狀態", () => {
        it("修改成功 Todo -> Done", () => {
            const todo = new Todo({
                description: "吃飯",
                startTime: new Date("2024-08-24 18:00:00"),
                endTime: new Date("2024-08-24 23:59:00"),
                category: "dinner"
            });
            todo.changeStatus("done");
            expect(todo.status).toBe("done");
        });
        it("修改成功 Todo -> Progress", () => {
            const todo = new Todo({
                description: "吃飯",
                startTime: new Date("2024-08-24 18:00:00"),
                endTime: new Date("2024-08-24 23:59:00"),
                category: "dinner"
            });
            todo.changeStatus("progress");
            expect(todo.status).toBe("progress");
        });

        it("已經刪除的不可以再修改狀態", () => {
            const todo = new Todo({
                description: "吃飯",
                startTime: new Date("2024-08-24 18:00:00"),
                endTime: new Date("2024-08-24 23:59:00"),
                category: "dinner"
            });
            todo.markAsDeleted();
            expect(() => {
                todo.changeStatus("done");
            }).toThrowError("已刪除的待辦事項無法修改");
        });

        it("修改失敗 Todo -> Todo", () => {
            const todo = new Todo({
                description: "吃飯",
                startTime: new Date("2024-08-24 18:00:00"),
                endTime: new Date("2024-08-24 23:59:00"),
                category: "dinner"
            });
            expect(() => {
                todo.changeStatus("todo");
            }).toThrowError("狀態相同無法修改");
        });
    })

    describe("修改待辦事項", () => {
        it("修改成功", () =>{
            const todo = new Todo({
                description: "吃飯",
                startTime: new Date("2024-08-24 18:00:00"),
                endTime: new Date("2024-08-24 23:59:00"),
                category: "dinner"
            });

            todo.changeTodo({
                description: "吃烤肉",
                startTime: new Date("2024-08-25 19:00:00"),
                endTime: new Date("2024-08-25 23:59:00"),
                category: "BBQ"
            })
            // expect(todo.description).toBe("吃烤肉");
            // expect(todo.startTime).toEqual(new Date("2024-08-25 19:00:00"));
            // expect(todo.endTime).toEqual(new Date("2024-08-25 23:59:00"));
            // expect(todo.category).toBe("BBQ");
            // expect(todo.status).toBe("todo");
            // expect(todo.isDeleted).toBe(false);

            // other method
            expect(todo).toEqual(
                expect.objectContaining({
                    description: "吃烤肉",
                    startTime: new Date("2024-08-25 19:00:00"),
                    endTime: new Date("2024-08-25 23:59:00"),
                    category: "BBQ",
                    status: "todo",
                    isDeleted: false,
                })  
            )
        })

        it("已刪除的待辦事項無法修改", () =>{
            const todo = new Todo({
                description: "吃飯",
                startTime: new Date("2024-08-24 18:00:00"),
                endTime: new Date("2024-08-24 23:59:00"),
                category: "dinner"
            });
            todo.markAsDeleted()
            expect(()=>{
                todo.changeTodo({
                    description: "吃烤肉",
                    startTime: new Date("2024-08-25 19:00:00"),
                    endTime: new Date("2024-08-25 23:59:00"),
                    category: "BBQ"
                })
            }).toThrowError("已刪除的待辦事項無法修改");
        })
    })

    describe("刪除待辦事項", () => {
        it('刪除成功',()=>{
            const todo = new Todo({
                description: "吃飯",
                startTime: new Date("2024-08-24 18:00:00"),
                endTime: new Date("2024-08-24 23:59:00"),
                category: "dinner"
            });
            todo.markAsDeleted()
            expect(todo).toEqual(
                expect.objectContaining({
                    description: "吃飯",
                    startTime: new Date("2024-08-24 18:00:00"),
                    endTime: new Date("2024-08-24 23:59:00"),
                    category: "dinner",
                    status: "todo",
                    isDeleted: true,
                })
            )
        })        
    })        
});
