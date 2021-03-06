const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema

const ReportSchema = new Schema({
  userId:{
    type:String,
    required:true
  },
  pregnancies: {
    type: Number,
    required: true
  },
  glucose:{
      type:Number,
      required:true
  },
  bloodPressure: {
    type: Number,
    required: true
  },
  skinThickness:{
      type:Number,
      required:true
  },
  insulin: {
    type: Number,
    required: true
  },
  bmi: {
    type: Number,
    required:true
  },
  diabetesPedigreeFunction:{
      type:Number,
      required:true
  },
  age: {
    type: Number,
    required:true
  },
  prediction:{
    type:String,
    required:true
  }
});

module.exports = Report = mongoose.model("reports", ReportSchema);