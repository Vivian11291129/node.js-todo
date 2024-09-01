import { Todo } from '../Domain/todo.js'

class TodoRepository {
    dataSource = [
        new Todo({
            id: 1,
            description: 'Learning Node.JS',
            startTime: new Date("2024-09-01T16:00:00Z"),
            endTime: new Date("2024-09-01T20:00:00Z"),
            category: 'Study',
            status: 'progress'
        })
    ]

    getAll() {
        return this.dataSource.filter(todo=>todo.isDeleted===false)
    }

    createTodo(todo){
        this.dataSource.push(todo)
    }

    findTodoById(id){
        // lambda expression
        // todo => todo.id === id
        // for (let i = 0; i < this.dataSource.length; i++) {
        //     if (this.dataSource[i].id === id) {
        //         return this.dataSource[i]
        //     }
        // }
        const todo = this.dataSource.find(
            todo => todo.id === id && todo.isDeleted === false
        )
        return todo ? new Todo({
            id: todo.id,
            description: todo.description,
            startTime: todo.startTime,
            endTime: todo.endTime,
            category: todo.category,
            status: todo.status
        }): null
    }

    markAsDeleted(id){
        // return this.dataSource.find(todo => todo.id === id) ?? null
    }

    save(todo){
        const index = this.dataSource.findIndex(todo => todo.id === todo.id)
        if(index !== -1){
            this.dataSource[index] = todo
        }
    }
}
export default new TodoRepository()