import TodoService from '../Service/TodoService.js'

class TodoController {
    getTodoList(req, res) {
        res.json(TodoService.getTodoList())
    }

    createTodo(req, res){
        // http(protocal)://<host|domain>:<port>/path/path2?queryString=xxx
        // req.query == {queryString: xxx}
        // /api/todo/:id
        // req.params == {id: xxx} 
        // e.g. content-type: application/json
        // req.body == request body {key: value}
        res.json(TodoService.createTodo(req.body))
    }

    // id => req.params.id
    // body => req.body
    // description
    // startTime
    // endTime
    // category
    changeTodo(req, res){
        // req.query { key: value (typeof string) }
        // req.params { key: value (typeof string) }
        res.json(TodoService.changeTodo({
            ...req.body,
            // description: req.body.description,
            // startTime: req.body.startTime,
            // endTime: req.body.endTime,
            // category: req.body.category,
            id: Number(req.params.id)
        }))
        // body => { 
        //     startTime: '2021-09-01T00:00:00.000Z', 
        //     endTime: '2021-09-01T00:00:00.000Z' 
        // }
        // {req.body} => { body: { startTime: '2021-09-01T00:00:00.000Z', endTime: '2021-09-01T00:00:00.000Z' } } 
        // { ...req.body } => { startTime: '2021-09-01T00:00:00.000Z', endTime: '2021-09-01T00:00:00.000Z' }
        // {} => object
        // { key: value } => object
        // [] => array
    }

    markAsDeleted(req, res){
        res.json(TodoService.markAsDeleted({
            id: Number(req.params.id)
        }))
    }
}

export default new TodoController()