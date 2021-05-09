const express = require('express');
const mongoose = require('mongoose');


// mongodb setup
const dbURI = process.env.DB_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log('connected to db'))
  .catch(err => console.log(err));

const app= express();
app.use(express.json())


// User Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  bio : {
    type: String
  }  
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);
module.exports = User;

app.get('/user', (req,res)=>{
    user.find()
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err))
})

app.post('/user', (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio
    })
    user.save()
    .then(data => res.send('User saved'))
    .catch(err => res.status(400).send(err))
})

app.get('/user/:id', (req,res)=>{
    user.findOne({_id : req.params.id})
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err))
})

app.put('/user/:id', (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio
    })
    user.save()
    .then(data => res.send('User updated'))
    .catch(err => res.status(400).send(err))
})

app.get('/user/:id', (req,res)=>{
    user.findOneAndDelete({_id : req.params.id})
    .then(data => res.send('User deleted'))
    .catch(err => res.status(400).send(err))
})

const port = process.env.PORT || 5000
app.listen(port, console.log(`app is running on port ${port}, go to http://localhost:${port}`))