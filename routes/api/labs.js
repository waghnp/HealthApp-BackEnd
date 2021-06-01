const express = require("express");
const mongoose=require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInputForLab = require("../../validation/labRegister");
const validateLoginInputForLab = require("../../validation/labLogin");
// Load User model
const User = require("../../models/Lab");
const Lab = require("../../models/Lab");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInputForLab(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }Lab.findOne({ labEmail: req.body.labEmail }).then(lab => {
      if (lab) {
        return res.status(400).json({ labEmail : "Email already exists" });
      } else {
        const newLab = new Lab({
          labName: req.body.labName,
          labContact:req.body.labContact,
          labEmail: req.body.labEmail,
          labAddress:req.body.labAddress,
          labLocation:req.body.labLocation,
          labPassword: req.body.labPassword
        });// Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newLab.labPassword, salt, (err, hash) => {
            if (err) throw err;
            newLab.labPassword = hash;
            newLab
              .save()
              .then(lab => res.json(lab))
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
    const { errors, isValid } = validateLoginInputForLab(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const labEmail = req.body.labEmail;
    const labPassword = req.body.labPassword;
    // Find user by email
    Lab.findOne({ labEmail }).then(lab => {
      // Check if user exists
      if (!lab) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }// Check password
      bcrypt.compare(labPassword, lab.labPassword).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            labId: lab.id,
            labName: lab.labName,
            labEmail:lab.labEmail,
            labContact:lab.labContact,
            labAddress:lab.labAddress,
            labLocation:lab.labLocation
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
  //get all lab list
  router.get("/",async (req,res)=>{
    try{
        const labs= await Lab.find({});
        res.status(201).send(labs);
    }catch(err){
      res.status(500).send("Error "+err)
    }
  })
  //get all user appointments request
  router.get("/appointments/request/:id",async(req,res)=>{
    try{
      const id=req.params.id;
      const lab= await Lab.findOne({_id:id});
      if(!lab){
         return res.status(404).send("Lab not found so cannot get appointment request")
      }
      const labAppointments=lab.labAppointments
      return res.status(201).send(labAppointments)
    }catch(error){
            res.send({Error : error.message})
    }
  })
  //make appointment or update appointment
  router.patch("/appointment/request/:id",async(req,res)=>{
        
        try{
            const id=req.params.id;
            const lab= await Lab.findOne({_id:id});
            if(!lab){
              return  res.status(404).send("Lab not found so cannot update appointment request")
            }
            const labAppointment={
                // id:mongoose.Types.ObjectId(),
                name:req.body.name,
                mobileNum:req.body.mobileNum,
                email:req.body.email,
            }
            lab.labAppointments.unshift(labAppointment);
            const newLab = await lab.save()
            // console.log(newUser)
            return res.status(201).send(newLab.labAppointments[0])
        }catch(error){
            res.send({Error : error.message})
        }
  });

  module.exports = router;