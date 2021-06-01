const express = require("express");
const mongoose=require("mongoose");

const Report = require("../../models/Report");

router.post("/", (req, res) => {
    
    Report.findOne().then(report => {

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
    });
  });   


router.get("/",async (req,res)=>{
    try{
        const report= await Report.find({});
        res.status(201).send(report);
    }catch(err){
      res.status(500).send("Error "+err)
    }
  })

module.exports=router;