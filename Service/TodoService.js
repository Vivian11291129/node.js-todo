import TodoRepository from '../Repository/TodoRepository.js'
import { Todo } from '../Domain/todo.js'

class TodoService {
    getTodoList(){
        return TodoRepository.getAll()
    }

    createTodo({
        description,
        startTime,
        endTime,
        category,
    }){
        const todo = new Todo({
            id: Date.now(),
            description,
            startTime,
            endTime,
            category,
        })
        return TodoRepository.createTodo(todo)
    }

    changeTodo({
        id,
        description,
        startTime,
        endTime,
        category,
    }){
        // Three-Tier Architecture 三層式架構
        // Clean Architecture 乾淨架構
        // 查
        const todo = TodoRepository.findTodoById(id)
        if (!todo) {
            throw new Error("找不到id")
        }
        // value type vs reference type
        // 值型別 vs 參考型別
        // Domain Object
        // 改
        todo.changeTodo({
            description,
            startTime,
            endTime,
            category,
        })
        // save todo to repository (dataSource)
        // 存
        TodoRepository.save(todo)
        // 推
    }

    markAsDeleted({id}){
        const todo = TodoRepository.findTodoById(id)
        if (!todo) {
            throw new Error("找不到id")
        }
        todo.markAsDeleted()
        // save todo to repository (dataSource)
    }
}
export default new TodoService()