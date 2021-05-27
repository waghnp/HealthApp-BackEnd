const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mobileNum:{
      type:Number,
      required:true
  },
  email: {
    type: String,
    required: true
  },
  adharNum:{
      type:Number,
      required:true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String
  },
  appointments:[
    {
      id: {
        type: mongoose.Schema.Types.ObjectId
      },
        labName:{
            type:String
        },
        labContact:{
            type:Number
        },
        labEmail:{
            type: String
        },
        labAddress:{
            type:String
        },
        labLocation:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now
        },
        time:{
            type:String
        },
        status:{
            type:Boolean,
            default:false
        }
    },
  ]
});

module.exports = User = mongoose.model("users", UserSchema);