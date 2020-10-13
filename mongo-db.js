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

//   db.collection('users').insertMany([
//     {
//         name : 'jen',
//         age: 27

//     },
//     {
//         name: 'carlos',
//         age:25
//     },{
//         name:'rachel',
//         age:30

//     }
//   ]).then((result)=>{
//       console.log(result)
//   }).catch((error)=>{
//       console.log(error)
//   })
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
    // db.collection('tasks').find({completed:true}).toArray((error,task)=>{
    //     if(error)
    //     {
    //         return console.log('unable to print')
    //     }
    //     console.log(task)
    // })

    // db.collection('user').updateMany({
    //     _id:ObjectID("5f6a2f0cc291f02240c01f95")
    // },{
    //     $inc:{
    //         age: 3
    //     }
    // }).then((result)=>{
    //     console.log(result)

    // }).catch((error)=>{
    //     console.log(error)

    // })
    
    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        age:27
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
    

    db.collection('tasks').deleteOne({
        task3: 'email check'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})

