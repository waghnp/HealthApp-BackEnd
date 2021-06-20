const express = require("express");
const mongoose=require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          mobileNum:req.body.mobileNum,
          email: req.body.email,
          adharNum:req.body.adharNum,
          password: req.body.password
        });// Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });   

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }// Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            email:user.email,
            mobileNum:user.mobileNum,
            adharNum:user.adharNum
          };// Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  //get nearby hospitals
  router.post("/hospitals",async(req,res)=>{
    try{
        const lat=req.body.lat;
        const log=req.body.log;

        const hospitals= await axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lat},${log}&q=hospital%20&apikey=volOjktJQPeTydZis5vLk7VK8KjcP66H2s7k6gg9wD4&limit=5`)

        if(hospitals){
          return res.status(201).send(hospitals.data.items);
        }
        return res.status(404).send("Please Enter correct position of yours");
    }catch(error){
      res.send({Error : error.message})
    } 
  })
  //get all user appointments
  router.get("/appointments/:id",async(req,res)=>{
    try{
      const id=req.params.id;
      const user= await User.findOne({_id:id});
      if(!user){
         return res.status(404).send("User not found so cannot get all appointments")
      }
      const appointments=user.appointments
      return res.status(201).send(appointments)
    }catch(error){
            res.send({Error : error.message})
    }
  })
  //make appointment or update appointment
  router.patch("/appointment/:id",async(req,res)=>{
        
        try{
            const id=req.params.id;
            const user= await User.findOne({_id:id});
            if(!user){
              return  res.status(404).send("User not found so cannot make appointment")
            }
            const appointment={
                // id:mongoose.Types.ObjectId(),
                labName:req.body.labName,
                labAddress:req.body.labAddress,  
                labLocation:req.body.labLocation,
                labContact:req.body.labContact,
                labEmail:req.body.labEmail,
                date:req.body.date,
                time:req.body.time,
            }
            user.appointments.unshift(appointment);
            const newUser = await user.save()
            // console.log(newUser)
            return res.status(201).send(newUser.appointments[0])
        }catch(error){
            res.send({Error : error.message})
        }
  });

  module.exports = router;