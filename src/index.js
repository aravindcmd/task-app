const e = require('express')
const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')
const { update } = require('./models/tasks')
const Tasks = require('./models/tasks')

require('./db/mongoose')
const User = require('./models/user')
const app = express()


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT||3001
app.listen(port,()=> {
    console.log('server is running is running'+port)
})




