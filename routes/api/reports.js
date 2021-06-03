const express = require("express");
const mongoose=require("mongoose");
const router = express.Router();

const Report = require("../../models/Report");

router.post("/", (req, res) => {
      try{
        const newReport = new Report({
          pregnancies: req.body.pregnancies,
          glucose:req.body.glucose,
          bloodPressure: req.body.bloodPressure,
          skinThickness:req.body.skinThickness,
          insulin:req.body.insulin,
          bmi: req.body.bmi,
          diabetesPedigreeFunction:req.body.diabetesPedigreeFunction,
          age:req.body.age
        });
        if(!newReport)
          return res.status(404).send("report Not saved")
        newReport.save();
        res.status(201).send(newReport);
      }catch(err){
        res.status(500).send("Error "+err.message)
      }
  
  });   


router.get("/",async (req,res)=>{
    try{
        const reports= await Report.find({});
        res.status(201).send(reports);
    }catch(err){
      res.status(500).send("Error "+err.message)
    }
  })

module.exports=router;