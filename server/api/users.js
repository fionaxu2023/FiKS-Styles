const router = require('express').Router()
const  {User} = require('../db/index')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async(req,res,next)=>{
  try{
    const single = await User.findByPk(
      req.params.userId
    )
    if(single){
      res.send(single)
    }else{
      res.status(404).send("Not Found")
    }
  }
  catch(error){
    next(error)
  }
})

router.post('/', async(req,res,next)=>{
  try{
    const newUser = await User.create(req.body)
      res.send(newUser)
  }
  catch(error){
    next(error)
  }
})


router.delete('/:userId', async(req,res,next)=>{
  try{
    const deleteuser = await User.destroy({ where: {id : req.params.userId }})
      res.sendStatus(204)
    }
  catch(error){
    next(error)
  }
})

router.put('/:userId', async(req,res,next)=>{
  try{
      const target = await User.findByPk(req.params.userId)
      res.send(await target.update(req.body))
  }
  catch(error){
    next(error)
  }
})



module.exports = router