const express = require("express");
const mongoose=require("mongoose");
const router = express.Router();
const axios = require("axios");

const Report = require("../../models/Report");

router.post('/predict',async(req,res)=>{
    try{
      const report=req.body
      const requestData={
        data:{
          ...report
        }
      }
      console.log("prediction req ",requestData)
      const result = await axios.post('https://diabeteshealthapp.herokuapp.com/predict',requestData);
      console.log('prediction ',result.data)
      if(result){
        return res.status(201).send(result.data)
      }
      return res.status(404).send("prediction incomplete")
    }catch(err){
      res.status(501).send('Error '+err.message)
    }
})

router.post("/", (req, res) => {
      try{
        const newReport = new Report({
          pregnancies: req.body.Pregnancies,
          glucose:req.body.Glucose,
          bloodPressure: req.body.BloodPressure,
          skinThickness:req.body.SkinThickness,
          insulin:req.body.Insulin,
          bmi: req.body.BMI,
          diabetesPedigreeFunction:req.body.DiabetesPedigreeFunction,
          age:req.body.Age
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