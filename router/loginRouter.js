const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const Login = require('../model/loginModel')

router.get('/statusChange',async(req,res) => {
    try{
        const login = await Login.find()
        for(var i = 0;i< login.length;i++)
            {
                login[i].loginStatus = false
                await login[i].save()
            }
        res.json(login)
    }
    catch(error){
        res.send('error'+error)
    }
})

router.post('/getMessage',async(req,res) => {
    try{
        const login = await Login.findOne({username:req.body.username})
        res.json(login.message)
    }
    catch(error){
        res.send('Error' + error)
    }
})

router.get('/:username',async(req,res) => {
    try{
        const login = await Login.findOne({username:req.params.username})
        res.json(login)
    }
    catch(error){
        res.send('Error' + error)
    }
})

router.post('/register',async(req,res) => {
    const login = new Login({
        username : req.body.user,
        password : req.body.pass
    })
    try{
        let user = await Login.findOne({ username:req.body.user });
        if(user){
            res.status(500).send('Username already exists')
            }
        else{
            const salt = await bcrypt.genSalt(10);
            login.password = await bcrypt.hash(login.password, salt);
            const getData = await login.save()
            res.json(getData)
        }
    }
    catch(error) {
        res.send('Error' + error)
    }
})

router.post('/authenticate',async(req,res) => {
    try{
        let user = await Login.findOne({ username:req.body.username })
        if (req.body.username === '' || req.body.password === ''){
            res.status(400).send("Some fields are empty")
        }
        else if(user){
            let match = await bcrypt.compare(req.body.password, user.password)
            if(match){
                user.loginStatus = req.body.status
                await user.save()
                res.json(user)
            }
            else{
                res.status(400).send("Password Incorrect")
            }
        }
        else{
            res.status(400).send("Username or Password Incorrect") 
        }
    }
    catch(error) {
        res.send('Error' + error)
    }
})

router.post('/logout',async(req,res) => {
    try{
        let user = await Login.findOne({ username:req.body.username })
        user.loginStatus = req.body.status
        await user.save()
        res.json(user)
    }
    catch(error) {
        res.send('Error' + error)
    }
})

module.exports = router



