import express from 'express';
import TodoController from './Controller/TodoController.js';

const app = express()
const port = 3000
const router = express.Router()

router.get('/todo', TodoController.getTodoList)
router.post('/todo', TodoController.createTodo)
router.put('/todo/:id', TodoController.changeTodo)
router.delete('/todo/:id',TodoController.markAsDeleted)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
