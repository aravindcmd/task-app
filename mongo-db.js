// const mongodb= require('mongodb')

// const MongoClient = mongodb.MongoClient

// const ObjectID = mongodb.ObjectID

const {MongoClient,ObjectID} = require( 'mongodb')

const id = new ObjectID()
console.log('Printing ID for terminal ' +id)
console.log(id.getTimestamp())
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName= 'task-manager'

MongoClient.connect(connectionUrl,{useNewUrlParser: true},(error,client)=>{
    if(error){
        return console.log('unable to connect to the database')
    }
  const db= client.db(databaseName)
//   db.collection('users').findOne({_id:new ObjectID('5f6c3cdfcf1dd13b305b4e58')},(error,user)=>{
//      if(error){
//          return console.log(error)
//      }
//      console.log(user)


//   })

//   db.collection('users').find({age: 23}).toArray((error,user)=>{
//       if(error){
//         return  console.log(error)
//       }
//       console.log(user)
//   })

//   db.collection('tasks').find({_id: ObjectID("5f6c3fb2eab3450c2ca7b077")}).toArray((error,task)=>{
//     if(error)
//     {
//         return console.log('unable to print')
//     }
//     console.log(task)

//   })
    db.collection('tasks').find({completed:true}).toArray((error,task)=>{
        if(error)
        {
            return console.log('unable to print')
        }
        console.log(task)
    })

      
})

