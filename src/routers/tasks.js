const { query } = require('express')
const express = require('express')

const auth = require('../middleware/auth')
const Tasks = require('../models/tasks')
const router = new express.Router()


router.post('/tasks',auth,async (req,res)=>{
   // const task = new Tasks(req.body)
   const task = new Tasks({
       ...req.body,
       owner: req.user._id

   })
    try{
        await task.save()
        res.status(201).send(task)                        //create a new task
    }catch(e){
        res.send(400).send(task)
    }

    
})



//GET // tasks?completed=true
//limit,skip    
//tasks?limit=10{a set of page}&skip=0{it is the set of pages}

//GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth,async (req,res)=>{
    const match= {}
    const sort={}

        if(req.query.completed){
            match.completed = req.query.completed==='true'
        }
        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]]= parts[1]==='desc' ?-1:1
        }
    try{
        // const task = await Tasks.find({owner:req.user._id}) // both the lines do the same job
         await req.user.populate({
             path:'tasks',
             match,
             options:{
                 limit:parseInt(req.query.limit),
                 skip:parseInt(req.query.skip),
                 sort
             }
         }).execPopulate()
         res.status(201).send(req.user.tasks)
    }catch(e){                                             // list all the task
        res.status(500).send(e)
    }
    
})


router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try{
       // const task = await Tasks.findById(_id)
       const task = await Tasks.findOne({_id,owner:req.user._id})
        if(!task){                                      //find task by id
            res.status(404).send()
        }
        res.status(201).send(task)

    }
    catch(e){
        res.status(500).send(e)

    }
    
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOp = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOp){
        res.status(400).send({error:'invalid update request'})
    }          
    try{
        const task = await Tasks.findOne({_id:req.params.id,owner:req.user._id})
        //const task = await Tasks.findById(req.params.id)
        
        //const task = await Tasks.findByIdAndUpdate(req.params.id,req.body,{new : true,runValidators:true})  // update task
        if(!task){
            res.status(400).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.send(500).send(e)
    }


})


router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const tasks = await Tasks.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!tasks){
            res.status(404).send()
        }                                                                   //delete task
        res.status(200).send(tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
})






module.exports = router