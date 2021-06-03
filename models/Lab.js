const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema

const LabSchema = new Schema({
  labName: {
    type: String,
    required: true
  },
  labContact:{
      type:Number,
      required:true
  },
  labEmail: {
    type: String,
    required: true
  },
  labAddress:{
      type:String,
      required:true
  },
  labLocation:{
      type:String,
      required:true
  },
  labPassword: {
    type: String,
    required: true
  },
  labPassword2: {
    type: String
  },
  isLab:{
    type:Boolean,
    default:true
  },
  labAppointments:[
    {
      id: {
        type: mongoose.Schema.Types.ObjectId
      },
        name:{
            type:String
        },
        mobileNum:{
            type:Number
        },
        email:{
            type: String
        },
        isAccepted:{
          type:Boolean,
          default:false
        }
    },
  ]
});

module.exports = Lab = mongoose.model("labs", LabSchema);