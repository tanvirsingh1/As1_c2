
/*********************************************************************************
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Tanvir Singh Student ID: 104642210 Date: 2023-01-20
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/ 

const express = require("express"); // Include express.js module
const app = express();
const cors = require('cors')
var path = require("path");
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
var HTTP_PORT = process.env.PORT || 8080;  
require('dotenv').config();
app.use(cors());
app.use(express.json())
app.get('/', function (req, res) {
   
   res.json({message: "API Listening"})
})
app.post('/api/movies', function (req, res) {

  res.status(201).db.addNewMovie(req.body)
  
 })
 app.get('/api/movies', function (req, res) {
   db.getAllMovies(req.query.page, req.query.perPage, req.query.title).then(function(movie_data)
   {
res.status(201).json(movie_data)
   }).catch(function(err)
   {
    res.status(500).json(err)
   })

 })
 
 app.get('/api/movies/:id', function (req, res) {
   db.getMovieById(req.params.id).then(function(movie_data)
   {
    res.status(200).json(movie_data)
   }).catch(function(err)
   {
    res.status(500).json(err)
   })
   
 })
 
 app.put('/api/movies/:id', function (req, res) {
    db.updateMovieById(req.body,req.params.id).then(function(movie_data)
    {
     res.status(200).json(movie_data)
    }).catch(function(err)
    {
     res.status(500).json(err)
    })
    
  })
  app.get('/api/movies/:id', function (req, res) {
    db.getMovieById(req.params.id).then(function(movie_data)
    {
     res.status(200).json(movie_data)
    }).catch(function(err)
    {
     res.status(500).json(err)
    })
    
  })
  app.delete('/api/movies/:id', function (req, res) {
    db.deleteMovieById(req.params.id).then(function()
    {
     res.status(200).send("Movie Deleted Succesfully")
    }).catch(function(err)
    {
     res.status(500).json(err)
    })
    
  })
  
 
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
   });